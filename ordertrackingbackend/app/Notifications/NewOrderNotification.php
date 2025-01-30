<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\ShippingOrder;
use App\Models\User;

class NewOrderNotification extends Notification
{
    use Queueable;

    protected $order;
    protected $admin;

    public function __construct(ShippingOrder $order, User $admin)
    {
        $this->order = $order;
        $this->admin = $admin;
    }

    public function via($notifiable)
    {
        return ['mail']; // You can also use ['database', 'mail'] if needed
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Order Placed')
            ->greeting('Hello ' . $this->admin->name . ',')
            ->line('A new order has been placed.')
            ->line('Order Number: ' . $this->order->order_number)
            ->line('Pickup Location: ' . $this->order->pickup_location)
            ->line('Shipping Location: ' . $this->order->shipping_location)
            ->action('View Order', url('/admin/login/'))
            ->line('Please review the order and take necessary action.');
    }
}
