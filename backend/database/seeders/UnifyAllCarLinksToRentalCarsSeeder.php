<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class UnifyAllCarLinksToRentalCarsSeeder extends Seeder
{
    /**
     * Unify all car booking links to use Rentalcars.com as the sole aggregator.
     * Constructs dynamic URLs based on each car's location with proper URL encoding.
     */
    public function run(): void
    {
        $updatedCount = 0;
        $fallbackUrl = 'https://www.rentalcars.com/';

        // Chunk through all cars to handle large datasets efficiently
        Car::chunk(100, function ($cars) use (&$updatedCount, $fallbackUrl) {
            foreach ($cars as $car) {
                $location = $car->location;
                $bookingUrl = $fallbackUrl;

                if (!empty($location)) {
                    // Extract city name: take first part before comma (e.g., "Cairo, Egypt" -> "Cairo")
                    $cityName = trim(explode(',', $location)[0]);
                    
                    if (!empty($cityName)) {
                        // URL encode the city name to handle spaces and special characters
                        $encodedCity = urlencode($cityName);
                        // Use correct Rentalcars.com search URL format
                        $bookingUrl = "https://www.rentalcars.com/search?location={$encodedCity}";
                    }
                }

                $car->update([
                    'booking_link' => $bookingUrl,
                ]);

                $updatedCount++;
            }
        });

        $this->command->info("Successfully updated {$updatedCount} car(s) with Rentalcars.com booking links.");
    }
}
