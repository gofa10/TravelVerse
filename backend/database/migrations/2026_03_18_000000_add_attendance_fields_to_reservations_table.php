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
        Schema::table('reservations', function (Blueprint $table) {
            $table->enum('attendance_status', ['confirmed_attended', 'no_show'])
                ->nullable()
                ->after('cancelled_at')
                ->index();
            
            $table->timestamp('attendance_marked_at')
                ->nullable()
                ->after('attendance_status');
            
            $table->foreignId('attendance_marked_by')
                ->nullable()
                ->after('attendance_marked_at')
                ->constrained('users')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign(['attendance_marked_by']);
            $table->dropColumn(['attendance_status', 'attendance_marked_at', 'attendance_marked_by']);
        });
    }
};
