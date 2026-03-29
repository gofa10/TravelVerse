<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Trip extends Model
{
    use HasFactory;
    protected $fillable = [
        'name_en','name_ar', 'price', 'location', 'start_date', 'end_date',
        'guide_id', 'booking_link', 'rate',
        'description_en','description_ar',
        'duration', 'continent', 'difficulty'
    ];

    protected $with = ['images'];

    public function guide()
    {
        return $this->belongsTo(User::class, 'guide_id');
    }
    public function images()
{
    return $this->morphMany(Image::class, 'imageable');
}
public function favorites()
{
    return $this->morphMany(Favorite::class, 'favoritable');
}
public function carts()
{
    return $this->morphMany(Cart::class, 'cartable');
}
public function reviews()
{
    return $this->morphMany(Review::class, 'reviewable');
}
public function reservations()
{
    return $this->morphMany(Reservation::class, 'reservable');
}
public function reviewsCount()
{
    return $this->reviews()->count();
}

}
