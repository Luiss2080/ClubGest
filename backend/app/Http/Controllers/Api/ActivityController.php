<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Activity;

/**
 * Controlador de Actividades de Impacto Social
 */
class ActivityController extends Controller
{
    /**
     * Lista las próximas actividades agendadas.
     */
    public function index(): JsonResponse
    {
        // Eager loading del proyecto asociado
        $activities = Activity::with('project')
            ->where('scheduled_at', '>=', now())
            ->orderBy('scheduled_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $activities
        ], 200);
    }

    /**
     * Agenda una nueva actividad.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'name' => 'required|string|max:200',
            'scheduled_at' => 'required|date|after:today',
            'location' => 'nullable|string|max:255',
            'type' => 'required|in:fundraising,social_impact,other',
            'status' => 'required|in:planned,in_progress,finished,cancelled'
        ]);

        $activity = Activity::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Actividad agendada con éxito.',
            'data' => $activity
        ], 201);
    }
}
