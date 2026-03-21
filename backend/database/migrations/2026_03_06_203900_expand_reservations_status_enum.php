<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement(
            "ALTER TABLE `reservations` MODIFY `status` ENUM('saved','pending','accepted','confirmed','rejected','claimed_completed','completed','cancelled') NOT NULL DEFAULT 'pending'"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement(
            "ALTER TABLE `reservations` MODIFY `status` ENUM('pending','accepted','rejected') NOT NULL DEFAULT 'pending'"
        );
    }
};
