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
        // Users table
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (Schema::hasColumn('users', 'user_type') && !collect(Schema::getIndexes('users'))->pluck('columns')->flatten()->contains('user_type')) {
                    $table->index('user_type');
                }
            });
        }

        // Hotels table
        if (Schema::hasTable('hotels')) {
            Schema::table('hotels', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('hotels'))->pluck('columns')->flatten();
                if (Schema::hasColumn('hotels', 'location') && !$indexes->contains('location')) {
                    $table->index('location');
                }
                if (Schema::hasColumn('hotels', 'class') && !$indexes->contains('class')) {
                    $table->index('class');
                }
                if (Schema::hasColumn('hotels', 'price') && !$indexes->contains('price')) {
                    $table->index('price');
                }
            });
        }

        // Activities table
        if (Schema::hasTable('activities')) {
            Schema::table('activities', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('activities'))->pluck('columns')->flatten();
                if (Schema::hasColumn('activities', 'location') && !$indexes->contains('location')) {
                    $table->index('location');
                }
                if (Schema::hasColumn('activities', 'type') && !$indexes->contains('type')) {
                    $table->index('type');
                }
                if (Schema::hasColumn('activities', 'price') && !$indexes->contains('price')) {
                    $table->index('price');
                }
            });
        }

        // Cars table
        if (Schema::hasTable('cars')) {
            Schema::table('cars', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('cars'))->pluck('columns')->flatten();
                if (Schema::hasColumn('cars', 'location') && !$indexes->contains('location')) {
                    $table->index('location');
                }
                if (Schema::hasColumn('cars', 'price') && !$indexes->contains('price')) {
                    $table->index('price');
                }
            });
        }

        // Cruises table
        if (Schema::hasTable('cruises')) {
            Schema::table('cruises', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('cruises'))->pluck('columns')->flatten();
                if (Schema::hasColumn('cruises', 'location') && !$indexes->contains('location')) {
                    $table->index('location');
                }
                if (Schema::hasColumn('cruises', 'from') && !$indexes->contains('from')) {
                    $table->index('from');
                }
                if (Schema::hasColumn('cruises', 'to') && !$indexes->contains('to')) {
                    $table->index('to');
                }
                if (Schema::hasColumn('cruises', 'price') && !$indexes->contains('price')) {
                    $table->index('price');
                }
            });
        }

        // Flights table
        if (Schema::hasTable('flights')) {
            Schema::table('flights', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('flights'))->pluck('columns')->flatten();
                if (Schema::hasColumn('flights', 'from_location') && !$indexes->contains('from_location')) {
                    $table->index('from_location');
                }
                if (Schema::hasColumn('flights', 'to_location') && !$indexes->contains('to_location')) {
                    $table->index('to_location');
                }
                if (Schema::hasColumn('flights', 'departure_time') && !$indexes->contains('departure_time')) {
                    $table->index('departure_time');
                }
                if (Schema::hasColumn('flights', 'price') && !$indexes->contains('price')) {
                    $table->index('price');
                }
            });
        }

        // Restaurants table
        if (Schema::hasTable('restaurants')) {
            Schema::table('restaurants', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('restaurants'))->pluck('columns')->flatten();
                if (Schema::hasColumn('restaurants', 'location') && !$indexes->contains('location')) {
                    $table->index('location');
                }
                if (Schema::hasColumn('restaurants', 'property_type') && !$indexes->contains('property_type')) {
                    $table->index('property_type');
                }
                if (Schema::hasColumn('restaurants', 'cuisine') && !$indexes->contains('cuisine')) {
                    $table->index('cuisine');
                }
            });
        }

        // Trips table
        if (Schema::hasTable('trips')) {
            Schema::table('trips', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('trips'))->pluck('columns')->flatten();
                if (Schema::hasColumn('trips', 'location') && !$indexes->contains('location')) {
                    $table->index('location');
                }
                if (Schema::hasColumn('trips', 'price') && !$indexes->contains('price')) {
                    $table->index('price');
                }
                if (Schema::hasColumn('trips', 'guide_id') && !$indexes->contains('guide_id')) {
                    $table->index('guide_id');
                }
            });
        }

        // Reservations table
        if (Schema::hasTable('reservations')) {
            Schema::table('reservations', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('reservations'))->pluck('columns')->flatten();
                if (Schema::hasColumn('reservations', 'user_id') && !$indexes->contains('user_id')) {
                    $table->index('user_id');
                }
                if (Schema::hasColumn('reservations', 'status') && !$indexes->contains('status')) {
                    $table->index('status');
                }
                if (Schema::hasColumn('reservations', 'created_at') && !$indexes->contains('created_at')) {
                    $table->index('created_at');
                }
            });
        }

        // Reviews table
        if (Schema::hasTable('reviews')) {
            Schema::table('reviews', function (Blueprint $table) {
                $indexes = collect(Schema::getIndexes('reviews'))->pluck('columns')->flatten();
                if (Schema::hasColumn('reviews', 'user_id') && !$indexes->contains('user_id')) {
                    $table->index('user_id');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                try { $table->dropIndex(['user_type']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('hotels')) {
            Schema::table('hotels', function (Blueprint $table) {
                try { $table->dropIndex(['location']); } catch(\Exception $e) {}
                try { $table->dropIndex(['class']); } catch(\Exception $e) {}
                try { $table->dropIndex(['price']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('activities')) {
            Schema::table('activities', function (Blueprint $table) {
                try { $table->dropIndex(['location']); } catch(\Exception $e) {}
                try { $table->dropIndex(['type']); } catch(\Exception $e) {}
                try { $table->dropIndex(['price']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('cars')) {
            Schema::table('cars', function (Blueprint $table) {
                try { $table->dropIndex(['location']); } catch(\Exception $e) {}
                try { $table->dropIndex(['price']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('cruises')) {
            Schema::table('cruises', function (Blueprint $table) {
                try { $table->dropIndex(['location']); } catch(\Exception $e) {}
                try { $table->dropIndex(['from']); } catch(\Exception $e) {}
                try { $table->dropIndex(['to']); } catch(\Exception $e) {}
                try { $table->dropIndex(['price']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('flights')) {
            Schema::table('flights', function (Blueprint $table) {
                try { $table->dropIndex(['from_location']); } catch(\Exception $e) {}
                try { $table->dropIndex(['to_location']); } catch(\Exception $e) {}
                try { $table->dropIndex(['departure_time']); } catch(\Exception $e) {}
                try { $table->dropIndex(['price']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('restaurants')) {
            Schema::table('restaurants', function (Blueprint $table) {
                try { $table->dropIndex(['location']); } catch(\Exception $e) {}
                try { $table->dropIndex(['property_type']); } catch(\Exception $e) {}
                try { $table->dropIndex(['cuisine']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('trips')) {
            Schema::table('trips', function (Blueprint $table) {
                try { $table->dropIndex(['location']); } catch(\Exception $e) {}
                try { $table->dropIndex(['price']); } catch(\Exception $e) {}
                try { $table->dropIndex(['guide_id']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('reservations')) {
            Schema::table('reservations', function (Blueprint $table) {
                try { $table->dropIndex(['user_id']); } catch(\Exception $e) {}
                try { $table->dropIndex(['status']); } catch(\Exception $e) {}
                try { $table->dropIndex(['created_at']); } catch(\Exception $e) {}
            });
        }

        if (Schema::hasTable('reviews')) {
            Schema::table('reviews', function (Blueprint $table) {
                try { $table->dropIndex(['user_id']); } catch(\Exception $e) {}
            });
        }
    }
};
