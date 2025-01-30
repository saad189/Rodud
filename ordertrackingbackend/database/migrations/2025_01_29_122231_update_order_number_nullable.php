<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('shipping_orders', function (Blueprint $table) {
            $table->string('order_number')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('shipping_orders', function (Blueprint $table) {
            $table->string('order_number')->nullable(false)->change();
        });
    }
};
