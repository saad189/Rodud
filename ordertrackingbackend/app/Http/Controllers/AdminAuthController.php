<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminAuthController extends Controller
{
    public function showLoginForm()
    {
        // If already logged in, redirect to admin dashboard
        if (Auth::check()) {
            return redirect()->route('admin_dashboard');
        }
        return view('admin_login');
    }

    public function authenticate(Request $request)
    {
        Log::info('Login attemptING');
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt login
        // Adjust 'email' or 'username' field as necessary to match your DB
        $credentials = [
            'email' => $request->input('username'),
            'password' => $request->input('password'),
        ];

        if (Auth::attempt($credentials)) {
            Log::info('Login attempt SUCCESS', ['credentials' => $credentials]);
            // If successful, redirect to admin dashboard
            return redirect()->route('admin_dashboard');
        } else {
            // If failed, redirect back with error
            Log::info('Login attempt failed', ['credentials' => $credentials]);
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Invalid username or password');
        }
    }
}
