<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Update any existing tour_guide to user
        DB::table('users')->where('user_type', 'tour_guide')->update(['user_type' => 'user']);

        // 2. Alter the enum to remove tour_guide
        DB::statement("ALTER TABLE users MODIFY user_type ENUM('user', 'admin') NOT NULL DEFAULT 'user'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add it back
        DB::statement("ALTER TABLE users MODIFY user_type ENUM('user', 'admin', 'tour_guide') NOT NULL DEFAULT 'user'");
    }
};
