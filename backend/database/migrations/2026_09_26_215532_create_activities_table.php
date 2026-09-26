<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            // Integridad referencial estricta
            $table->foreignId('project_id')->constrained()->cascadeOnUpdate()->restrictOnDelete();
            
            $table->string('name', 200)->index();
            $table->dateTime('scheduled_at')->index();
            $table->string('location', 255)->nullable();
            $table->enum('type', ['fundraising', 'social_impact', 'other'])->default('social_impact')->index();
            $table->enum('status', ['planned', 'in_progress', 'finished', 'cancelled'])->default('planned')->index();
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
