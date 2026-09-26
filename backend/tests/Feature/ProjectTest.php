<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba Unitaria: Creación de Proyectos con Subida de Archivos.
     */
    public function test_creacion_de_proyecto_con_imagen_segura()
    {
        // 1. Simulamos el disco duro para no guardar archivos basura durante los tests
        Storage::fake('public');
        
        // 2. Simulamos la sesión de un usuario autenticado (Sanctum)
        $user = User::factory()->create();
        $this->actingAs($user);

        // 3. Fabricamos un archivo de imagen falso malicioso (simulando un ataque)
        $archivoMalicioso = UploadedFile::fake()->create('hacker.php', 100, 'text/x-php');
        
        $respuestaFallida = $this->postJson('/api/projects', [
            'title' => 'Proyecto Hackeado',
            'target_budget' => 1000,
            'image' => $archivoMalicioso
        ]);

        // Verificamos que el sistema rechace el archivo malicioso (Error 422 Unprocessable Entity)
        $respuestaFallida->assertStatus(422);
        
        // 4. Fabricamos una imagen genuina y válida
        $archivoValido = UploadedFile::fake()->image('portada.jpg');

        $respuestaExitosa = $this->postJson('/api/projects', [
            'title' => 'Comedor Solidario Test',
            'target_budget' => 5000,
            'image' => $archivoValido
        ]);

        // Verificamos que el sistema acepte la imagen válida
        $respuestaExitosa->assertStatus(201);
        
        // Verificamos que el proyecto realmente se escribió en la Base de Datos
        $this->assertDatabaseHas('projects', [
            'title' => 'Comedor Solidario Test'
        ]);

        // Verificamos que el archivo se guardó físicamente en el disco
        $project = Project::where('title', 'Comedor Solidario Test')->first();
        $this->assertNotNull($project->image_path);
        Storage::disk('public')->assertExists($project->image_path);
    }
}
