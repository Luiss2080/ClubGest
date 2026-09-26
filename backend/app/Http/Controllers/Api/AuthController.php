<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

/**
 * Controlador de Autenticación (Capa de Presentación)
 * Restringido a recibir peticiones y devolver respuestas, delegando la lógica al Servicio.
 */
class AuthController extends Controller
{
    private AuthService $authService;

    // Inyección de dependencias para el Servicio
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $token = $this->authService->login($credentials);

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login exitoso',
            'data' => [
                'token' => $token
            ]
        ], 200);
    }

    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8'
        ]);

        $user = $this->authService->register($data);

        return response()->json([
            'success' => true,
            'message' => 'Usuario voluntario registrado exitosamente',
            'data' => [
                'user' => $user
            ]
        ], 201);
    }
}
