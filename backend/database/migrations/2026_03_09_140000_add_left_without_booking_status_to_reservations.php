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
            "ALTER TABLE `reservations` MODIFY `status` ENUM('saved','redirect_pending','booking_claimed','booking_declined','left_without_booking','cancelled') NOT NULL DEFAULT 'saved'"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement(
            "ALTER TABLE `reservations` MODIFY `status` ENUM('saved','redirect_pending','booking_claimed','booking_declined','cancelled') NOT NULL DEFAULT 'saved'"
        );
    }
};

