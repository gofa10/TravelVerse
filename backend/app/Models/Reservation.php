<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reservable_type',
        'reservable_id',
        'status',
        'date',
        'people',
        'cancelled_at',
        'attendance_status',
        'attendance_marked_at',
        'attendance_marked_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservable()
    {
        return $this->morphTo();
    }

    // Helper method to get trip when reservable is a Trip
    public function trip()
    {
        return $this->morphTo('reservable')->where('reservable_type', Trip::class);
    }

    protected $casts = [
        'cancelled_at' => 'datetime',
        'attendance_marked_at' => 'datetime',
    ];
}
