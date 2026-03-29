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
        // Fix image morph types to use the morph map keys
        DB::statement("UPDATE images SET imageable_type = 'trip' WHERE imageable_type = 'App\\\\Models\\\\Trip'");
        DB::statement("UPDATE images SET imageable_type = 'hotel' WHERE imageable_type = 'App\\\\Models\\\\Hotel'");
        DB::statement("UPDATE images SET imageable_type = 'restaurant' WHERE imageable_type = 'App\\\\Models\\\\Restaurant'");
        DB::statement("UPDATE images SET imageable_type = 'activity' WHERE imageable_type = 'App\\\\Models\\\\Activity'");
        DB::statement("UPDATE images SET imageable_type = 'car' WHERE imageable_type = 'App\\\\Models\\\\Car'");
        DB::statement("UPDATE images SET imageable_type = 'cruise' WHERE imageable_type = 'App\\\\Models\\\\Cruise'");
        
        // Fix other morph relationships too
        $this->fixMorphType('favorites', 'favoritable_type');
        $this->fixMorphType('carts', 'cartable_type');
        $this->fixMorphType('reviews', 'reviewable_type');
        $this->fixMorphType('reservations', 'reservable_type');
        
        // Fix specific variations
        DB::statement("UPDATE favorites SET favoritable_type = 'activity' WHERE favoritable_type = 'activitie'");
        DB::statement("UPDATE carts SET cartable_type = 'activity' WHERE cartable_type = 'activitie'");
        DB::statement("UPDATE reviews SET reviewable_type = 'activity' WHERE reviewable_type = 'activitie'");
        DB::statement("UPDATE reservations SET reservable_type = 'activity' WHERE reservable_type = 'activitie'");
        
        // Handle Flight model - remove invalid entries
        DB::statement("DELETE FROM favorites WHERE favoritable_type = 'App\\\\Models\\\\Flight'");
        DB::statement("DELETE FROM carts WHERE cartable_type = 'App\\\\Models\\\\Flight'");
        DB::statement("DELETE FROM reviews WHERE reviewable_type = 'App\\\\Models\\\\Flight'");
        DB::statement("DELETE FROM reservations WHERE reservable_type = 'App\\\\Models\\\\Flight'");
    }

    private function fixMorphType($table, $column)
    {
        DB::statement("UPDATE {$table} SET {$column} = 'trip' WHERE {$column} = 'App\\\\Models\\\\Trip'");
        DB::statement("UPDATE {$table} SET {$column} = 'hotel' WHERE {$column} = 'App\\\\Models\\\\Hotel'");
        DB::statement("UPDATE {$table} SET {$column} = 'restaurant' WHERE {$column} = 'App\\\\Models\\\\Restaurant'");
        DB::statement("UPDATE {$table} SET {$column} = 'activity' WHERE {$column} = 'App\\\\Models\\\\Activity'");
        DB::statement("UPDATE {$table} SET {$column} = 'car' WHERE {$column} = 'App\\\\Models\\\\Car'");
        DB::statement("UPDATE {$table} SET {$column} = 'cruise' WHERE {$column} = 'App\\\\Models\\\\Cruise'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to full class names
        DB::statement("UPDATE images SET imageable_type = 'App\\\\Models\\\\Trip' WHERE imageable_type = 'trip'");
        DB::statement("UPDATE images SET imageable_type = 'App\\\\Models\\\\Hotel' WHERE imageable_type = 'hotel'");
        DB::statement("UPDATE images SET imageable_type = 'App\\\\Models\\\\Restaurant' WHERE imageable_type = 'restaurant'");
        DB::statement("UPDATE images SET imageable_type = 'App\\\\Models\\\\Activity' WHERE imageable_type = 'activity'");
        DB::statement("UPDATE images SET imageable_type = 'App\\\\Models\\\\Car' WHERE imageable_type = 'car'");
        DB::statement("UPDATE images SET imageable_type = 'App\\\\Models\\\\Cruise' WHERE imageable_type = 'cruise'");
        
        // Revert other morph relationships
        $this->revertMorphType('favorites', 'favoritable_type');
        $this->revertMorphType('carts', 'cartable_type');
        $this->revertMorphType('reviews', 'reviewable_type');
        $this->revertMorphType('reservations', 'reservable_type');
    }

    private function revertMorphType($table, $column)
    {
        DB::statement("UPDATE {$table} SET {$column} = 'App\\\\Models\\\\Trip' WHERE {$column} = 'trip'");
        DB::statement("UPDATE {$table} SET {$column} = 'App\\\\Models\\\\Hotel' WHERE {$column} = 'hotel'");
        DB::statement("UPDATE {$table} SET {$column} = 'App\\\\Models\\\\Restaurant' WHERE {$column} = 'restaurant'");
        DB::statement("UPDATE {$table} SET {$column} = 'App\\\\Models\\\\Activity' WHERE {$column} = 'activity'");
        DB::statement("UPDATE {$table} SET {$column} = 'App\\\\Models\\\\Car' WHERE {$column} = 'car'");
        DB::statement("UPDATE {$table} SET {$column} = 'App\\\\Models\\\\Cruise' WHERE {$column} = 'cruise'");
    }
};
