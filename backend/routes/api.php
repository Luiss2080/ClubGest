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

// PASO 3: Exponemos la ruta de Checkout para que la Landing Page (Pública) pueda recibir donaciones
Route::post('/donations/checkout', [DonationController::class, 'checkout']);

// Rutas Protegidas por Sanctum (Solo Voluntarios/Admins logueados)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json(['success' => true, 'data' => $request->user()]);
    });
    
    // Rutas Administrativas
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('donations', DonationController::class)->except(['checkout']);
    
    Route::post('/logout', [AuthController::class, 'logout']);
});
