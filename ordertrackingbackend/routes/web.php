<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShippingOrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminAuthController;
// Public Routes
Route::get('/', function () {
    return view('welcome');
});

$middlewares = ['auth:sanctum'];




// Show the login form (GET request)
Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.loginForm');

// Process the login form (POST request)
Route::post('/admin/login', [AdminAuthController::class, 'authenticate'])->name('admin.login');

// Admin Dashboard route (protected by auth middleware, for example)
// Route::get('/admin', [AdminAuthController::class, 'dashboard'])
//     ->middleware('auth:admin')
//     ->name('admin_dashboard');


Route::post('/auth/login', [UserController::class, 'login']);
Route::post('/users/signup', [UserController::class, 'signup']);
// Route::get('/admin', [AdminController::class, 'index']);
Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);


// Route::middleware(['auth'])->group(function () {
//     Route::get('/admin', [AdminAuthController::class, 'dashboard'])->name('admin_dashboard');
//     Route::post('/admin/orders/{id}/update-status', [AdminController::class, 'updateOrderStatus']);
// });



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
