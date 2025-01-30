<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShippingOrderController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

$middlewares = ['auth:api'];


Route::post('/auth/login', [UserController::class, 'login']);
Route::post('/users/signup', [UserController::class, 'signup']);


// Protected Routes
Route::middleware($middlewares)->group(function () {
    Route::get('/users/profile', [UserController::class, 'getProfile']); // Get profile of authenticated user
});

Route::middleware($middlewares)->group(function () {
    Route::get('/shipping-orders', [ShippingOrderController::class, 'getAllOrders']); // Get all orders
    Route::get('/shipping-orders/user', [ShippingOrderController::class, 'getUserOrders']); // Get orders for a specific user
    Route::post('/shipping-orders', [ShippingOrderController::class, 'addOrder']); // Add a new order
    Route::put('/shipping-orders/{id}', [ShippingOrderController::class, 'updateOrder']); // Update an existing order
});


Route::middleware(['auth'])->group(function () {
    Route::post('/admin/orders/{id}/update-status', [AdminController::class, 'updateOrderStatus'])
        ->name('admin.updateOrderStatus');
});
