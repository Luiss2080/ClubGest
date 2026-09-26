<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sponsors', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150)->index()->comment('Nombre de la empresa o individuo');
            $table->enum('type', ['company', 'individual'])->default('individual')->index();
            $table->string('contact_email', 150)->unique()->nullable();
            $table->string('phone', 30)->nullable();
            
            // Auditoría y estabilidad
            $table->timestamps();
            $table->softDeletes()->comment('Evita borrar datos históricos vinculados a donaciones');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sponsors');
    }
};
