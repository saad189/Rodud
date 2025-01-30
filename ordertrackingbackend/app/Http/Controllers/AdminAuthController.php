<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User; // Make sure to import your User model
use Illuminate\Support\Facades\Session;

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
        // Validate input
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find user by email or username field
        // Adjust 'email' to 'username' if your DB column is named differently
        $user = User::where('email', $request->input('username'))->first();

        // Check if user exists and password is correct
        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Invalid username or password');
        }

        // Check if user is admin
        if ($user->is_admin !== 1) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'You are not authorized to access the admin dashboard');
        }

        // Store the user info in the session (so the dashboard can identify the user)
        Session::put('logged_in_user', $user);  // Alternative session approach
        Session::save();  // Force session to save before redirect
        // Log the username, password, and user email
        Log::info('Admin login attempt', [
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'user_email' => $user->email,
        ]);
        // Redirect to the admin dashboard
        return redirect()->route('admin_dashboard', compact('user'));
    }
}
