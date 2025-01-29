<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

// Public Routes
Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin_dashboard');
