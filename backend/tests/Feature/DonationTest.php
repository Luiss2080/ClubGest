<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Sponsor;
use App\Models\Project;

class DonationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba E2E: Verifica que un voluntario autenticado pueda registrar donaciones seguras.
     */
    public function test_authenticated_volunteer_can_create_donation()
    {
        // 1. Arrange: Preparamos el entorno (Sanctum User + Sponsor)
        $user = User::factory()->create();
        $sponsor = Sponsor::factory()->create(['name' => 'TechCorp Solidario']);
        $project = Project::factory()->create(['status' => 'active']);

        $payload = [
            'sponsor_id' => $sponsor->id,
            'project_id' => $project->id,
            'amount' => 1500.50,
            'donation_date' => now()->format('Y-m-d')
        ];

        // 2. Act: Simulamos la petición HTTP con el Token
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/donations', $payload);

        // 3. Assert: Verificamos respuesta 201 y que esté en la base de datos real
        $response->assertStatus(201)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('message', 'Donación registrada correctamente.');
                 
        $this->assertDatabaseHas('donations', [
            'amount' => 1500.50,
            'sponsor_id' => $sponsor->id
        ]);
    }

    /**
     * Prueba de Seguridad (QA): Verifica que intrusos no puedan inyectar donaciones.
     */
    public function test_unauthenticated_user_is_blocked_from_donations()
    {
        $response = $this->postJson('/api/donations', [
            'sponsor_id' => 1,
            'amount' => 5000.00
        ]);

        // Debe retornar 401 Unauthorized (Middlewares de Sanctum)
        $response->assertStatus(401);
    }
}
