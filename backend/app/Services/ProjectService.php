<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Exception;

/**
 * Capa de Aplicación - Proyectos
 */
class ProjectService
{
    public function getAllProjects(): Collection
    {
        return Project::orderBy('created_at', 'desc')->get();
    }

    public function createProject(array $data): Project
    {
        return Project::create($data);
    }

    /**
     * Regla de Negocio: Actualizar estado de un proyecto.
     */
    public function updateProjectStatus(int $id, string $status): Project
    {
        $project = Project::findOrFail($id);
        
        if ($project->status === 'cancelled') {
            throw new Exception("No se puede reactivar o completar un proyecto que ya fue cancelado permanentemente.");
        }

        $project->status = $status;
        $project->save();
        
        return $project;
    }
}
