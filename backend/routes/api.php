<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ActivityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Rutas Públicas
Route::post('/login', [AuthController::class, 'login']);

// Exponemos la ruta de Checkout para que la Landing Page (Pública) pueda iniciar donaciones
Route::post('/donations/checkout', [DonationController::class, 'checkout']);

// PASO 6: Ruta pública sin protección CSRF ni Auth para que los servidores de Stripe puedan hacer "ping"
Route::post('/webhooks/stripe', [\App\Http\Controllers\Api\WebhookController::class, 'handleStripeWebhook']);

// Rutas Protegidas por Sanctum (Solo Voluntarios/Admins logueados)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json(['success' => true, 'data' => $request->user()]);
    });
    
    // Rutas Administrativas
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('activities', ActivityController::class);
    
    // PASO 10: Habilitamos la ruta de exportación (Debe ir antes del apiResource para evitar colisiones de rutas)
    Route::get('/donations/export', [DonationController::class, 'exportCSV']);
    Route::apiResource('donations', DonationController::class)->except(['checkout']);
    
    Route::post('/logout', [AuthController::class, 'logout']);
});
