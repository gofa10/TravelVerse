<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class UpdateTestCarLinksSeeder extends Seeder
{
    /**
     * Update booking_link for ALL cars in the database.
     */
    public function run(): void
    {
        // Get ALL cars
        $allCars = Car::orderBy('id')->get();

        if ($allCars->isEmpty()) {
            $this->command->warn('No cars found in the database.');
            return;
        }

        // Valid test URLs for car rental providers
        $testUrls = [
            'https://www.greenmotion.com/en/locations',
            'https://www.avis.com/en/reservation',
            'https://www.budget.com/en/reservation',
        ];

        foreach ($allCars as $index => $car) {
            $testUrl = $testUrls[$index % count($testUrls)];
            
            $car->update([
                'booking_link' => $testUrl,
            ]);
        }

        $this->command->info("Successfully updated {$allCars->count()} car(s) with new booking links.");
    }
}
