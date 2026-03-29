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
        Schema::create('trip_plan_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trip_plan_id')->constrained('trip_plans')->cascadeOnDelete();
            $table->unsignedBigInteger('plannable_id');
            $table->string('plannable_type');
            $table->integer('day_number')->nullable();
            $table->date('planned_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['trip_plan_id', 'plannable_id', 'plannable_type'], 'trip_plan_items_unique_plannable');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trip_plan_items');
    }
};
