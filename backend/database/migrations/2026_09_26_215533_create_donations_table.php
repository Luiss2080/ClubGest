<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            
            // Restrict on delete para que nunca se pueda borrar un Sponsor que haya donado dinero
            $table->foreignId('sponsor_id')->constrained()->cascadeOnUpdate()->restrictOnDelete();
            
            // Relaciones opcionales (nullable)
            $table->foreignId('project_id')->nullable()->constrained()->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignId('activity_id')->nullable()->constrained()->cascadeOnUpdate()->restrictOnDelete();
            
            // Campos monetarios ultra estables
            $table->decimal('amount', 15, 2)->unsigned();
            $table->string('currency', 3)->default('USD');
            $table->date('donation_date')->index();
            $table->string('receipt_path', 255)->nullable()->comment('Ruta al comprobante o factura');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
