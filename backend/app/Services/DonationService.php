<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Exception;

/**
 * Capa de Aplicación - Lógica de Negocio Financiera
 */
class DonationService
{
    /**
     * Extrae todas las donaciones.
     */
    public function getAllDonations(): Collection
    {
        return Donation::with(['sponsor', 'project'])->orderBy('donation_date', 'desc')->get();
    }

    /**
     * Crea una donación aplicando reglas de negocio puras.
     */
    public function createDonation(array $data): Donation
    {
        // Regla de Negocio: Si la donación va a un proyecto, validar que no esté cancelado
        if (isset($data['project_id'])) {
            $project = Project::find($data['project_id']);
            if ($project && $project->status === 'cancelled') {
                throw new Exception("No se puede registrar una donación a un proyecto cancelado.");
            }
        }

        return Donation::create($data);
    }

    /**
     * Elimina una donación (Soft Delete) de manera segura.
     */
    public function deleteDonation(int $id): bool
    {
        $donation = Donation::findOrFail($id);
        // Regla de negocio adicional podría ir aquí (ej. auditoría de quién lo borró)
        return $donation->delete();
    }
}
