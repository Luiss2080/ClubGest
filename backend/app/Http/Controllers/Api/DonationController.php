<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDonationRequest;
use App\Services\DonationService;
use Illuminate\Http\JsonResponse;
use Exception;

/**
 * Controlador de Donaciones (Capa de Presentación Extremadamente Limpia)
 */
class DonationController extends Controller
{
    private DonationService $donationService;

    // Inyección del Servicio
    public function __construct(DonationService $donationService)
    {
        $this->donationService = $donationService;
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $this->donationService->getAllDonations()
        ], 200);
    }

    public function store(StoreDonationRequest $request): JsonResponse
    {
        try {
            // El request ya viene validado automáticamente por StoreDonationRequest
            $donation = $this->donationService->createDonation($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Donación registrada correctamente.',
                'data' => $donation
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400); // Bad Request por regla de negocio
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->donationService->deleteDonation($id);
            return response()->json([
                'success' => true,
                'message' => 'Donación eliminada (Soft Delete).'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'No se encontró la donación.'
            ], 404);
        }
    }
}
