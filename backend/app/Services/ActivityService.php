<?php

namespace App\Services;

use App\Models\Activity;
use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Exception;

class ActivityService
{
    public function getUpcomingActivities(): Collection
    {
        return Activity::with('project')
            ->where('scheduled_at', '>=', now())
            ->orderBy('scheduled_at', 'asc')
            ->get();
    }

    public function createActivity(array $data): Activity
    {
        $project = Project::find($data['project_id']);
        
        // Regla de Negocio: No agendar actividades para un proyecto finalizado.
        if ($project && $project->status === 'completed') {
            throw new Exception("No se pueden agendar nuevas actividades en un proyecto que ya fue completado.");
        }

        return Activity::create($data);
    }
}
