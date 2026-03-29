<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Global fix for all unmapped types in the images table
        DB::table('images')->where('imageable_type', 'App\\Models\\Trip')->update(['imageable_type' => 'trip']);
        DB::table('images')->where('imageable_type', 'App\\Models\\Activity')->update(['imageable_type' => 'activity']);
        DB::table('images')->where('imageable_type', 'App\\Models\\Hotel')->update(['imageable_type' => 'hotel']);
        DB::table('images')->where('imageable_type', 'App\\Models\\Restaurant')->update(['imageable_type' => 'restaurant']);
        DB::table('images')->where('imageable_type', 'App\\Models\\Car')->update(['imageable_type' => 'car']);
        DB::table('images')->where('imageable_type', 'App\\Models\\Cruise')->update(['imageable_type' => 'cruise']);
        DB::table('images')->where('imageable_type', 'App\\Models\\Flight')->update(['imageable_type' => 'flight']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No easy way to reverse this without knowing which ones were specifically updated
    }
};
