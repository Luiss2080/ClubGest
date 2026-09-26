<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Donation;
use App\Models\Sponsor;
use App\Models\Project;

/**
 * Controlador Dedicado para Webhooks de Servicios de Terceros (Stripe).
 * Paso 5: Cerrar el ciclo financiero automáticamente.
 */
class WebhookController extends Controller
{
    /**
     * Recibe la confirmación asíncrona desde los servidores de Stripe
     * cuando un donante realmente completa el pago con su tarjeta.
     */
    public function handleStripeWebhook(Request $request)
    {
        // 1. Extraemos el cuerpo de la notificación enviada por Stripe
        $payload = $request->all();
        
        // (En producción, aquí va la lógica de verificación de firmas criptográficas de Stripe
        // para asegurar que la petición viene de Stripe y no de un hacker)
        
        Log::info('Stripe Webhook Recibido', ['type' => $payload['type'] ?? 'unknown']);

        // 2. Escuchamos específicamente el evento "checkout.session.completed"
        // Este evento significa que el banco aprobó la tarjeta y el dinero ya es nuestro.
        if (isset($payload['type']) && $payload['type'] === 'checkout.session.completed') {
            
            $sessionData = $payload['data']['object'];
            
            // 3. Extraemos los metadatos y el dinero
            $amountInCents = $sessionData['amount_total'];
            $amountInDollars = $amountInCents / 100;
            $customerEmail = $sessionData['customer_details']['email'] ?? 'anonimo@clubgest.org';
            $customerName = $sessionData['customer_details']['name'] ?? 'Donante Anónimo';
            
            // 4. Buscamos o Creamos al Sponsor (Donante) en nuestra base de datos
            $sponsor = Sponsor::firstOrCreate(
                ['email' => $customerEmail],
                ['name' => $customerName, 'type' => 'individual']
            );

            // 5. Registramos la donación oficial en el sistema (Impacta las estadísticas del Dashboard)
            Donation::create([
                'sponsor_id' => $sponsor->id,
                'amount' => $amountInDollars,
                'donation_date' => now(),
            ]);

            Log::info("Donación exitosa registrada: $" . $amountInDollars . " de " . $customerEmail);
        }

        // 6. Respondemos con 200 OK para que Stripe sepa que recibimos el mensaje y no vuelva a enviarlo.
        return response()->json(['status' => 'success'], 200);
    }
}
