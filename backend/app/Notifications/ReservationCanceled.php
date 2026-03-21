<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationCanceled extends Notification
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
                    ->subject('Reservation Cancelled')
                    ->greeting('Hello!')
                    ->line('Your reservation has been cancelled successfully.')
                    ->line('Item: ' . $item)
                    ->line('Status: cancelled')
                    ->action('View Reservations', url('/user/reservations'))
                    ->line('We hope to serve you again soon.');
    }
}
