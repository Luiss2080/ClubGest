<?php

namespace App\Services;

use Exception;
// use Stripe\Stripe;
// use Stripe\Checkout\Session;

/**
 * Servicio Dedicado para Integración con Stripe.
 * Paso 1 de la implementación de la Pasarela de Pagos.
 */
class StripeService
{
    public function __construct()
    {
        // 1. Configuramos la llave secreta de Stripe que sacaremos del archivo .env
        // Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * Genera una sesión de pago (Checkout) segura alojada por Stripe.
     * 
     * @param float $amount Cantidad a donar.
     * @param string $projectName Nombre del proyecto (para mostrar en el recibo).
     * @return string URL de la pasarela de pagos.
     */
    public function createCheckoutSession(float $amount, string $projectName): string
    {
        try {
            /* 
             * 2. Construimos el objeto de sesión para Stripe.
             * Esto asegura que el pago se procese en los servidores de Stripe (PCI Compliance)
             * y no en nuestro servidor, evitando riesgos de seguridad con las tarjetas.
             */
             
            // $session = Session::create([
            //     'payment_method_types' => ['card'],
            //     'line_items' => [[
            //         'price_data' => [
            //             'currency' => 'usd',
            //             'product_data' => [
            //                 'name' => 'Donación: ' . $projectName,
            //             ],
            //             'unit_amount' => $amount * 100, // Stripe procesa en centavos
            //         ],
            //         'quantity' => 1,
            //     ]],
            //     'mode' => 'payment',
            //     'success_url' => config('app.frontend_url') . '/dashboard/donations?success=true',
            //     'cancel_url' => config('app.frontend_url') . '/?cancel=true',
            // ]);
            
            // return $session->url;

            // Retorno simulado mientras se instala el SDK de Composer
            return "https://checkout.stripe.com/pay/cs_test_simulado_12345";
            
        } catch (Exception $e) {
            throw new Exception("Error al conectar con la pasarela de pagos: " . $e->getMessage());
        }
    }
}
