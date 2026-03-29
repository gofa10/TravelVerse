<?php

namespace App\Support;

use App\Models\Activity;
use App\Models\Car;
use App\Models\Cruise;
use App\Models\Flight;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Trip;

class MorphTypeResolver
{
    /**
     * Canonical map of accepted aliases => model class.
     */
    private const TYPE_MAP = [
        'activity' => Activity::class,
        'activities' => Activity::class,
        'activitie' => Activity::class,
        'trip' => Trip::class,
        'trips' => Trip::class,
        'hotel' => Hotel::class,
        'hotels' => Hotel::class,
        'restaurant' => Restaurant::class,
        'restaurants' => Restaurant::class,
        'cruise' => Cruise::class,
        'cruises' => Cruise::class,
        'car' => Car::class,
        'cars' => Car::class,
        'flight' => Flight::class,
        'flights' => Flight::class,
    ];

    /**
     * Normalize user/client-provided morph type into a model class.
     */
    public static function toClass(?string $type): ?string
    {
        if (!$type) {
            return null;
        }

        $normalized = strtolower(trim($type));

        if (isset(self::TYPE_MAP[$normalized])) {
            return self::TYPE_MAP[$normalized];
        }

        // Accept fully-qualified class names that match our supported models.
        $allowedClasses = array_values(array_unique(self::TYPE_MAP));
        if (in_array($type, $allowedClasses, true)) {
            return $type;
        }

        // Accept class basenames (e.g. "Trip", "Hotel").
        foreach ($allowedClasses as $class) {
            if (strtolower(class_basename($class)) === $normalized) {
                return $class;
            }
        }

        return null;
    }

    /**
     * Validation aliases list for request "in:" rules.
     */
    public static function aliases(): array
    {
        return array_keys(self::TYPE_MAP);
    }
}

