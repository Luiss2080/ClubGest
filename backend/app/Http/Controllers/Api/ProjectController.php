<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;
use Exception;

class ProjectController extends Controller
{
    private ProjectService $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $this->projectService->getAllProjects()
        ], 200);
    }

    public function store(StoreProjectRequest $request): JsonResponse
    {
        try {
            // PASO 3: Pasamos los datos validados y el archivo crudo extraído de la petición.
            $project = $this->projectService->createProject(
                $request->validated(),
                $request->file('image')
            );
            
            return response()->json([
                'success' => true,
                'message' => 'Proyecto y portada registrados exitosamente.',
                'data' => $project
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
