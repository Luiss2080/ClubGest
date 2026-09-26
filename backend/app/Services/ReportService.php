<?php

namespace App\Services;

use App\Models\Donation;
use Illuminate\Support\Facades\Log;
use Exception;

/**
 * Servicio Dedicado para la Generación de Reportes.
 * Paso 8: Exportación avanzada de datos financieros.
 */
class ReportService
{
    /**
     * Genera un archivo CSV en memoria con el histórico de donaciones.
     * Esto es crítico para auditorías fiscales de la ONG.
     */
    public function generateDonationsCSV(): string
    {
        try {
            // 1. Obtenemos todas las donaciones y hacemos "Eager Loading" del Sponsor
            // para evitar el problema de N+1 queries en la base de datos.
            $donations = Donation::with('sponsor')->orderBy('donation_date', 'desc')->get();
            
            // 2. Definimos las cabeceras del archivo CSV
            $csvData = "ID Transacción,Donante,Tipo,Monto (USD),Fecha Oficial\n";
            
            // 3. Iteramos y construimos el cuerpo del reporte
            foreach ($donations as $donation) {
                $sponsorName = $donation->sponsor->name ?? 'Anónimo';
                $sponsorType = $donation->sponsor->type ?? 'N/A';
                
                // Formateamos los datos para evitar errores con comas en los nombres
                $csvData .= sprintf(
                    '"%s","%s","%s","%s","%s"%s',
                    $donation->id,
                    $sponsorName,
                    $sponsorType,
                    number_format($donation->amount, 2),
                    $donation->donation_date,
                    "\n"
                );
            }
            
            return $csvData;

        } catch (Exception $e) {
            Log::error("Error generando CSV de Donaciones: " . $e->getMessage());
            throw new Exception("No se pudo generar el reporte.");
        }
    }
}
