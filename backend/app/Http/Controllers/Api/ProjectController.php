<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Project;

/**
 * ProjectController
 * Maneja el listado y creación de proyectos/causas solidarias.
 */
class ProjectController extends Controller
{
    /**
     * Lista todos los proyectos de impacto social.
     */
    public function index(): JsonResponse
    {
        // En una app real, aquí usaríamos $this->projectService->getAll()
        $projects = Project::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Proyectos obtenidos exitosamente',
            'data' => $projects
        ], 200);
    }

    /**
     * Crea un nuevo proyecto.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'target_budget' => 'required|numeric|min:0'
        ]);

        $project = Project::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Proyecto creado exitosamente',
            'data' => $project
        ], 201);
    }
}
