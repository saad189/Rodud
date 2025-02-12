<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminAuthController;
// Public Routes
Route::get('/', function () {
    return view('welcome');
});
Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('login');


Route::middleware(['web'])->group(function () {
    Route::post('/admin/login', [AdminAuthController::class, 'authenticate']);
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin_dashboard');

    Route::middleware(['auth:web'])->group(function () {
        Route::post('/admin/orders/{id}/update-status', [AdminController::class, 'updateOrderStatus'])
            ->name('admin.updateOrderStatus');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
    });
});
