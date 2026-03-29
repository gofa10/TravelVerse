<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class UnifyAllCarLinksToExpediaSeeder extends Seeder
{
    /**
     * Unify all car booking links to use Expedia as the sole aggregator.
     * Constructs dynamic URLs based on each car's location with proper URL encoding.
     */
    public function run(): void
    {
        $updatedCount = 0;
        $fallbackUrl = 'https://www.expedia.com/Cars';

        // Chunk through all cars to handle large datasets efficiently
        Car::chunk(100, function ($cars) use (&$updatedCount, $fallbackUrl) {
            foreach ($cars as $car) {
                $location = $car->location;
                $bookingUrl = $fallbackUrl;

                if (!empty($location)) {
                    // Extract only the first part before comma (e.g., "Cairo, Egypt" -> "Cairo")
                    $cleanedLocation = trim(explode(',', $location)[0]);
                    
                    if (!empty($cleanedLocation)) {
                        // URL encode the cleaned location
                        $encodedLocation = urlencode($cleanedLocation);
                        $bookingUrl = "https://www.expedia.com/carsearch?locn={$encodedLocation}";
                    }
                }

                $car->update([
                    'booking_link' => $bookingUrl,
                ]);

                $updatedCount++;
            }
        });

        $this->command->info("Successfully updated {$updatedCount} car(s) with Expedia booking links.");
    }
}
