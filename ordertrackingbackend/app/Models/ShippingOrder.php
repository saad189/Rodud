<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingOrder extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'shipping_orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'order_number',
        'pickup_location',
        'shipping_location',
        'pickup_date',
        'delivery_date',
        'status',
        'size',
        'weight',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'pickup_date' => 'datetime',
        'delivery_date' => 'datetime',
        'status' => 'string',
        'size' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
