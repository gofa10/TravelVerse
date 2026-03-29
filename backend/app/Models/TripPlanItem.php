<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TripPlanItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'trip_plan_id',
        'plannable_id',
        'plannable_type',
        'day_number',
        'planned_date',
        'notes',
    ];

    protected $casts = [
        'planned_date' => 'date',
    ];

    public function tripPlan()
    {
        return $this->belongsTo(TripPlan::class);
    }

    public function plannable()
    {
        return $this->morphTo('plannable');
    }
}
