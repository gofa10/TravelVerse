<?php

namespace App\Providers;

use App\Models\Activity;
use App\Models\Car;
use App\Models\Cruise;
use App\Models\Flight;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Trip;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\Schema::defaultStringLength(191);

        Relation::morphMap([
            'activity' => Activity::class,
            'activities' => Activity::class,
            'trip' => Trip::class,
            'trips' => Trip::class,
            'hotel' => Hotel::class,
            'hotels' => Hotel::class,
            'restaurant' => Restaurant::class,
            'restaurants' => Restaurant::class,
            'car' => Car::class,
            'cars' => Car::class,
            'cruise' => Cruise::class,
            'cruises' => Cruise::class,
            'flight' => Flight::class,
            'flights' => Flight::class,
        ]);
    }
}
