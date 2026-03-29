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
        $map = [
            'App\\Models\\Activity' => 'activity',
            'App\\Models\\Trip' => 'trip',
            'App\\Models\\Hotel' => 'hotel',
            'App\\Models\\Restaurant' => 'restaurant',
            'App\\Models\\Car' => 'car',
            'App\\Models\\Cruise' => 'cruise',
            'App\\Models\\Flight' => 'flight',
        ];

        foreach ($map as $full => $short) {
            \Illuminate\Support\Facades\DB::table('images')
                ->where('imageable_type', $full)
                ->update(['imageable_type' => $short]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $map = [
            'activity' => 'App\\Models\\Activity',
            'trip' => 'App\\Models\\Trip',
            'hotel' => 'App\\Models\\Hotel',
            'restaurant' => 'App\\Models\\Restaurant',
            'car' => 'App\\Models\\Car',
            'cruise' => 'App\\Models\\Cruise',
            'flight' => 'App\\Models\\Flight',
        ];

        foreach ($map as $short => $full) {
             \Illuminate\Support\Facades\DB::table('images')
                ->where('imageable_type', $short)
                ->update(['imageable_type' => $full]);
        }
    }
};
