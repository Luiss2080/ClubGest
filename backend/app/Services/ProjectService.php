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

    /**
     * Regla de Negocio: Creación de proyecto manejando archivos adjuntos (Imágenes).
     */
    public function createProject(array $data, $imageFile = null): Project
    {
        // PASO 2: Si el controlador nos manda una imagen, la guardamos en el disco.
        if ($imageFile) {
            // Guarda el archivo de forma segura en `storage/app/public/projects`
            // Genera un nombre único (hash) automáticamente para evitar sobrescribir imágenes con el mismo nombre.
            $path = $imageFile->store('projects', 'public');
            
            // Adjuntamos la ruta generada al array de datos para que se guarde en la BD.
            $data['image_path'] = $path;
        }

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
