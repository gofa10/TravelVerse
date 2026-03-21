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
        // Step 1: allow both legacy + new values so remapping updates do not fail.
        DB::statement(
            "ALTER TABLE `reservations` MODIFY `status` ENUM('saved','pending','accepted','confirmed','rejected','claimed_completed','completed','cancelled','redirect_pending','booking_claimed','booking_declined') NOT NULL DEFAULT 'saved'"
        );

        // Map legacy statuses into the new aggregator flow before enum change.
        DB::statement("UPDATE `reservations` SET `status` = 'saved' WHERE `status` IN ('pending', 'accepted', 'confirmed')");
        DB::statement("UPDATE `reservations` SET `status` = 'booking_claimed' WHERE `status` IN ('claimed_completed', 'completed')");
        DB::statement("UPDATE `reservations` SET `status` = 'booking_declined' WHERE `status` = 'rejected'");

        DB::statement(
            "ALTER TABLE `reservations` MODIFY `status` ENUM('saved','redirect_pending','booking_claimed','booking_declined','cancelled') NOT NULL DEFAULT 'saved'"
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("UPDATE `reservations` SET `status` = 'pending' WHERE `status` = 'saved'");
        DB::statement("UPDATE `reservations` SET `status` = 'pending' WHERE `status` = 'redirect_pending'");
        DB::statement("UPDATE `reservations` SET `status` = 'accepted' WHERE `status` = 'booking_claimed'");
        DB::statement("UPDATE `reservations` SET `status` = 'rejected' WHERE `status` = 'booking_declined'");

        DB::statement(
            "ALTER TABLE `reservations` MODIFY `status` ENUM('saved','pending','accepted','confirmed','rejected','claimed_completed','completed','cancelled') NOT NULL DEFAULT 'pending'"
        );
    }
};
