<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200)->index();
            $table->text('description')->nullable();
            $table->decimal('target_budget', 15, 2)->default(0.00)->comment('Meta monetaria a alcanzar');
            $table->enum('status', ['active', 'completed', 'cancelled'])->default('active')->index();
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
