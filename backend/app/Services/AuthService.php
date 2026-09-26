<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

/**
 * Servicio de Autenticación (Capa de Aplicación/Dominio)
 * Mantiene la lógica de negocio aislada del framework HTTP.
 */
class AuthService
{
    /**
     * Valida credenciales y genera un token de acceso.
     */
    public function login(array $credentials): ?string
    {
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            /** @var User $user */
            
            // Retorna un Token plano (usando Laravel Sanctum)
            return $user->createToken('auth_token')->plainTextToken;
        }

        return null;
    }

    /**
     * Registra un nuevo voluntario o socio solidario.
     */
    public function register(array $data): User
    {
        $data['password'] = bcrypt($data['password']);
        
        // Por defecto todos nacen con rol de voluntario/miembro estándar
        $data['role'] = 'volunteer'; 

        return User::create($data);
    }
}
