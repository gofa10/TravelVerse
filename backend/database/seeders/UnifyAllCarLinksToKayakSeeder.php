<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class UnifyAllCarLinksToKayakSeeder extends Seeder
{
    /**
     * Unify all car booking links to use Kayak as the sole aggregator.
     * Constructs dynamic URLs based on each car's location with proper URL encoding.
     */
    public function run(): void
    {
        $updatedCount = 0;
        $fallbackUrl = 'https://www.kayak.com/cars/';

        // Chunk through all cars to handle large datasets efficiently
        Car::chunk(100, function ($cars) use (&$updatedCount, $fallbackUrl) {
            foreach ($cars as $car) {
                $location = $car->location;
                $bookingUrl = $fallbackUrl;

                if (!empty($location)) {
                    // URL encode the entire location string (handles "Cairo, Egypt" -> "Cairo%2C+Egypt")
                    $encodedLocation = urlencode($location);
                    $bookingUrl = "https://www.kayak.com/cars/{$encodedLocation}";
                }

                $car->update([
                    'booking_link' => $bookingUrl,
                ]);

                $updatedCount++;
            }
        });

        $this->command->info("Successfully updated {$updatedCount} car(s) with Kayak booking links.");
    }
}
