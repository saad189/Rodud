<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminAuthController;

// Public Routes
Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['web'])->group(function () {
    Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.loginForm');
    Route::post('/admin/login', [AdminAuthController::class, 'authenticate'])->name('admin.login');

    Route::middleware(['auth'])->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin_dashboard');
        Route::post('/admin/orders/{id}/update-status', [AdminController::class, 'updateOrderStatus'])
            ->name('admin.updateOrderStatus');
    });
});
