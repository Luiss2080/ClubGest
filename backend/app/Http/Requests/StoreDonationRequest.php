<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDonationRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado a hacer este request.
     */
    public function authorize(): bool
    {
        return true; // La autorización real de endpoints la maneja Sanctum/Middlewares
    }

    /**
     * Reglas de validación estrictas (Capa de validación separada del Controlador).
     */
    public function rules(): array
    {
        return [
            'sponsor_id' => 'required|exists:sponsors,id',
            'project_id' => 'nullable|exists:projects,id',
            'activity_id' => 'nullable|exists:activities,id',
            'amount' => 'required|numeric|min:0.01',
            'currency' => 'nullable|string|size:3',
            'donation_date' => 'required|date'
        ];
    }
}
