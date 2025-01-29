<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt login (assuming you allow either 'username' or 'email' for 'username' field)
        // For example, use 'email' field in the DB:
        $credentials = [
            'email' => $request->input('username'),
            'password' => $request->input('password')
        ];

        if (Auth::attempt($credentials)) {
            // If successful, redirect to admin dashboard
            return redirect()->route('admin_dashboard');
        } else {
            // If failed, redirect back with error
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Invalid username or password');
        }
    }

    public function dashboard()
    {
        // Render your admin dashboard view
        return view('admin_dashboard');
    }
}
