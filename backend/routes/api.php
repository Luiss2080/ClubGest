<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es donde registramos las rutas de la API de ClubGest.
| Todas estas rutas son cargadas por el RouteServiceProvider (o el bootstrap)
| y se les asigna automáticamente el prefijo "api".
|
*/

// ==========================================
// RUTAS PÚBLICAS (No requieren autenticación)
// ==========================================
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// ==========================================
// RUTAS PRIVADAS (Requieren Token Sanctum)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {
    
    // Retorna el perfil del usuario logueado actualmente
    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data' => $request->user()
        ]);
    });

    // Próximas rutas a programar:
    // Route::apiResource('projects', ProjectController::class);
    // Route::apiResource('donations', DonationController::class);
    // Route::apiResource('activities', ActivityController::class);
});
