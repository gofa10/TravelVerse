<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class UnifyAllCarLinksToTripAdvisorSeeder extends Seeder
{
    /**
     * Unify all car booking links to use TripAdvisor as the sole aggregator.
     * Constructs bulletproof search URLs that work reliably without geo-blocking.
     */
    public function run(): void
    {
        $updatedCount = 0;
        $fallbackUrl = 'https://www.tripadvisor.com/RentalCars';

        // Chunk through all cars to handle large datasets efficiently
        Car::chunk(100, function ($cars) use (&$updatedCount, $fallbackUrl) {
            foreach ($cars as $car) {
                $location = $car->location;
                $bookingUrl = $fallbackUrl;

                if (!empty($location)) {
                    // URL encode the location and construct TripAdvisor search URL
                    $encodedLocation = urlencode($location);
                    $bookingUrl = "https://www.tripadvisor.com/Search?q=Car+rental+in+{$encodedLocation}";
                }

                $car->update([
                    'booking_link' => $bookingUrl,
                ]);

                $updatedCount++;
            }
        });

        $this->command->info("Successfully updated {$updatedCount} car(s) with TripAdvisor booking links.");
    }
}
