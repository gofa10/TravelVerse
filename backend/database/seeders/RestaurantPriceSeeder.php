<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestaurantPriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurants = DB::table('restaurants')->get();

        foreach ($restaurants as $restaurant) {
            $cuisine = strtolower($restaurant->cuisine ?? '');
            $type = strtolower($restaurant->property_type ?? '');
            $name = strtolower($restaurant->name_en ?? '');

            if (
                str_contains($cuisine, 'french') ||
                str_contains($cuisine, 'japanese') ||
                str_contains($name, 'fine') ||
                str_contains($name, 'luxury')
            ) {
                $price = 95.00;

            } elseif (
                str_contains($cuisine, 'italian') ||
                str_contains($cuisine, 'seafood') ||
                str_contains($cuisine, 'steak')
            ) {
                $price = 65.00;

            } elseif (
                str_contains($type, 'cafe') ||
                str_contains($cuisine, 'coffee') ||
                str_contains($cuisine, 'bakery')
            ) {
                $price = 18.00;

            } elseif (
                str_contains($cuisine, 'fast') ||
                str_contains($cuisine, 'street') ||
                str_contains($cuisine, 'burger')
            ) {
                $price = 12.00;

            } elseif (
                str_contains($cuisine, 'middle eastern') ||
                str_contains($cuisine, 'arabic') ||
                str_contains($cuisine, 'egyptian')
            ) {
                $price = 35.00;

            } else {
                $price = 25.00; // default fallback
            }

            DB::table('restaurants')
                ->where('id', $restaurant->id)
                ->update(['price' => $price]);
        }
    }
}
