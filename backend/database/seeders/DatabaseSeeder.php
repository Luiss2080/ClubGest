<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Sponsor;
use App\Models\Donation;
use App\Models\Activity;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Seeder Principal - Paso 7: Población Automática de la Base de Datos.
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Creación de Usuarios (Roles) para el entorno de pruebas
        // Esto permite que el login (admin/password) funcione instantáneamente.
        User::updateOrCreate(['email' => 'admin@clubgest.org'], [
            'name' => 'Administrador Global',
            'password' => Hash::make('password'),
            // 'role' => 'admin' // (En caso de añadir el campo en migraciones)
        ]);

        User::updateOrCreate(['email' => 'voluntario@clubgest.org'], [
            'name' => 'Voluntario Activo',
            'password' => Hash::make('password'),
            // 'role' => 'voluntario'
        ]);

        // 2. Creación de Proyectos Iniciales (El core de la ONG)
        $comedor = Project::firstOrCreate(['title' => 'Construcción de Comedor Infantil'], [
            'target_budget' => 50000.00,
            'status' => 'active'
        ]);

        $reforestacion = Project::firstOrCreate(['title' => 'Jornada de Reforestación Urbana'], [
            'target_budget' => 15000.00,
            'status' => 'active'
        ]);

        // 3. Creación de Actividades vinculadas a los Proyectos
        Activity::firstOrCreate(['name' => 'Plantación de 500 Árboles'], [
            'project_id' => $reforestacion->id,
            'scheduled_at' => now()->addDays(15),
            'type' => 'social_impact',
            'status' => 'planned'
        ]);

        // 4. Creación de un Donante (Sponsor) y sus Donaciones Históricas
        // Para que los gráficos y la vista de Finanzas tengan datos reales al iniciar
        $sponsor = Sponsor::firstOrCreate(['email' => 'techcorp@empresa.com'], [
            'name' => 'TechCorp Solidario',
            'type' => 'corporate'
        ]);

        Donation::firstOrCreate([
            'sponsor_id' => $sponsor->id,
            'amount' => 2500.50,
            'donation_date' => now()->subDays(5)
        ]);

        Donation::firstOrCreate([
            'sponsor_id' => $sponsor->id,
            'amount' => 1000.00,
            'donation_date' => now()->subDays(2)
        ]);

        $this->command->info('✅ ¡Base de datos poblada exitosamente con datos de prueba (Seeders)!');
    }
}
