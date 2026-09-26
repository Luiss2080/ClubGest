<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_user', function (Blueprint $table) {
            $table->id();
            
            // Eliminación en cascada para tabla pivote
            $table->foreignId('activity_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            $table->decimal('hours_contributed', 5, 2)->default(0.00)->comment('Horas de voluntariado aportadas');
            
            // Índice compuesto para evitar registros duplicados de un mismo usuario en la misma actividad
            $table->unique(['activity_id', 'user_id']);
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_user');
    }
};
