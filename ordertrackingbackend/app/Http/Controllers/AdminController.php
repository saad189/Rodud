<?php

namespace App\Http\Controllers;

use App\Models\ShippingOrder;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function dashboard()
    {
        $user = auth()->guard('web')->user();

        if (!$user) {
            return redirect()->route('login')->with('error', 'Please log in first.');
        }

        $orders = ShippingOrder::with('user')->get();

        return view('admin_dashboard', compact('user', 'orders'));
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
