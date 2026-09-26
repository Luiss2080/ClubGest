<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Donation;

/**
 * Controlador de Donaciones
 * Gestiona de manera estricta el registro financiero de la ONG.
 */
class DonationController extends Controller
{
    /**
     * Lista todas las donaciones con eager loading para evitar consultas N+1.
     */
    public function index(): JsonResponse
    {
        // Aplicamos Eager Loading ('sponsor', 'project') cumpliendo la regla db-admin-skill
        $donations = Donation::with(['sponsor', 'project'])
            ->orderBy('donation_date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $donations
        ], 200);
    }

    /**
     * Registra el ingreso de una nueva donación.
     */
    public function store(Request $request): JsonResponse
    {
        // Sanitización y Validación estricta (qa-security-skill)
        $data = $request->validate([
            'sponsor_id' => 'required|exists:sponsors,id',
            'project_id' => 'nullable|exists:projects,id',
            'activity_id' => 'nullable|exists:activities,id',
            'amount' => 'required|numeric|min:0.01',
            'currency' => 'nullable|string|size:3',
            'donation_date' => 'required|date'
        ]);

        $donation = Donation::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Donación registrada en el sistema de manera segura.',
            'data' => $donation
        ], 201);
    }
}
