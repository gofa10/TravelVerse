<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationConfirmed extends Notification
{
   use Queueable;
    public function __construct(private readonly Reservation $reservation)
    {
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $item = class_basename($this->reservation->reservable_type) . ' #' . $this->reservation->reservable_id;

        return (new MailMessage)
                    ->subject('Booking Claimed on TravelVerse')
                    ->greeting('Hello!')
                    ->line('We received your booking claim successfully.')
                    ->line('Item: ' . $item)
                    ->line('Status: booking_claimed')
                    ->action('View Reservations', url('/user/reservations'))
                    ->line('Thank you for using our platform!');
    }
}
