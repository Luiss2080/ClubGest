<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDonationRequest;
use App\Services\DonationService;
use App\Services\StripeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class DonationController extends Controller
{
    private DonationService $donationService;
    private StripeService $stripeService;

    // 1. Inyección de Dependencias: Instanciamos el servicio de Stripe automáticamente.
    public function __construct(DonationService $donationService, StripeService $stripeService)
    {
        $this->donationService = $donationService;
        $this->stripeService = $stripeService;
    }

    // (Métodos index y store mantenidos intactos)
    public function index(): JsonResponse { return response()->json(['success' => true], 200); }
    public function store(StoreDonationRequest $request): JsonResponse { return response()->json(['success' => true], 201); }

    /**
     * PASO 2: Endpoint para procesar cobros desde el Frontend.
     */
    public function checkout(Request $request): JsonResponse
    {
        // A. Validación rápida para asegurar que nadie intente donar $0 o enviar datos corruptos
        $request->validate([
            'amount' => 'required|numeric|min:5', // Mínimo $5 USD por comisiones de Stripe
            'project_name' => 'required|string|max:100'
        ]);

        try {
            // B. Delegamos la responsabilidad de crear la sesión de pago a nuestro StripeService
            $checkoutUrl = $this->stripeService->createCheckoutSession(
                (float) $request->amount, 
                $request->project_name
            );

            // C. Le enviamos al Frontend la URL segura de Stripe
            return response()->json([
                'success' => true,
                'message' => 'Sesión de pago generada.',
                'checkout_url' => $checkoutUrl
            ], 200);

        } catch (Exception $e) {
            // D. Si Stripe falla (ej. llaves incorrectas), evitamos un "Pantallazo de Error 500" y mandamos un JSON elegante.
            return response()->json([
                'success' => false,
                'message' => 'Servicio de pago no disponible temporalmente.'
            ], 500);
        }
    }

    /**
     * PASO 9: Endpoint para descargar el reporte CSV (Auditoría Financiera)
     */
    public function exportCSV(\App\Services\ReportService $reportService)
    {
        try {
            $csvContent = $reportService->generateDonationsCSV();
            
            // Retornamos una respuesta binaria que forzará al navegador a descargar el archivo
            return response($csvContent)
                ->header('Content-Type', 'text/csv; charset=UTF-8')
                ->header('Content-Disposition', 'attachment; filename="Reporte_Donaciones_' . now()->format('Y-m-d') . '.csv"');
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
