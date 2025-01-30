<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AdminAuthController extends Controller
{
    public function showLoginForm()
    {
        // If already logged in, redirect to admin dashboard
        if (Auth::guard('web')->check()) {
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

        // Attempt login using the 'web' guard (session-based authentication)
        if (Auth::guard('web')->attempt([
            'email' => $request->input('username'),
            'password' => $request->input('password')
        ])) {
            $user = Auth::guard('web')->user();

            if ($user->is_admin !== 1) {
                Auth::logout();  // logout if not admin
                return redirect()
                    ->back()
                    ->withInput()
                    ->with('error', 'You are not authorized to access the admin dashboard');
            }

            return redirect()->route('admin_dashboard');
        } else {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Invalid username or password');
        }
    }

    public function logout(Request $request)
    {
        Session::flush(); // Clear all session data
        Auth::guard('web')->logout();   // Logout the user using the 'web' guard

        return redirect()->route('login')->with('message', 'Logged out successfully.');
    }
}
