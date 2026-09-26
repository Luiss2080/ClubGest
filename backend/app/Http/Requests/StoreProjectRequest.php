<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'target_budget' => 'required|numeric|min:0',
            'status' => 'nullable|in:active,completed,cancelled',
            
            // PASO 1: Validación estricta de archivos para evitar vulnerabilidades de subida de scripts maliciosos.
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ];
    }
}
