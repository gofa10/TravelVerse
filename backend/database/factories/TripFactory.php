<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trip>
 */
class TripFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->sentence;
        $location = $this->faker->city;

        return [
            'name_en' => $name,
            'name_ar' => 'رحلة ' . $this->faker->word,
            'location' => $location,
            'price' => $this->faker->randomFloat(2, 1000, 5000),
            'start_date' => now(),
            'end_date' => now()->addDays(3),
            'guide_id' => User::factory(),
            'booking_link' => 'https://www.tripadvisor.com/Search?q=' . urlencode($name . ' ' . $location),
            'rate' => $this->faker->randomFloat(1, 0, 5),
            'duration' => $this->faker->numberBetween(1, 14) . ' days',
            'continent' => $this->faker->randomElement(['Africa', 'Asia', 'Europe', 'America']),
            'difficulty' => $this->faker->randomElement(['easy', 'medium', 'hard']),
        ];

    }

}
