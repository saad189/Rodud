<?php

namespace App\Http\Controllers;

use App\Models\ShippingOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    public function dashboard()
    {
        $user = session('logged_in_user');

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please log in first.');
        }

        $orders = ShippingOrder::with('user')->get();
        $notifications = [
            ['message' => 'Order #123 has been updated.'],
            ['message' => '3 new users registered today.'],
            ['message' => 'Server backup completed.'],
        ];

        return view('admin_dashboard', compact('user', 'orders', 'notifications'));
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,In Progress,Delivered,Cancelled'
        ]);

        $order = ShippingOrder::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return response()->json(['success' => true, 'message' => 'Order status updated successfully']);
    }
}
