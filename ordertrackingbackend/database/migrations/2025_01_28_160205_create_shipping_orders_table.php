<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShippingOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shipping_orders', function (Blueprint $table) {
            $table->id(); // Primary key (id)
            $table->unsignedBigInteger('user_id'); // Foreign key to users table
            $table->string('order_number')->unique(); // Unique order number
            $table->string('pickup_location'); // Pickup location
            $table->string('shipping_location'); // Shipping location
            $table->dateTime('pickup_date'); // Pickup date
            $table->dateTime('delivery_date'); // Delivery date
            $table->enum('status', ['In Progress', 'Cancelled', 'Delivered', 'Pending']); // Enum for status
            $table->enum('size', ['Small', 'Medium', 'Large', 'Extra Large']); // Enum for size
            $table->float('weight'); // Weight as a float
            $table->timestamps(); // Created at and Updated at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shipping_orders');
    }
}
