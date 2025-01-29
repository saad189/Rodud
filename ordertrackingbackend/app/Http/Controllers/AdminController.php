<?php

namespace App\Http\Controllers;

use App\Models\ShippingOrder;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin_login');
    }

    public function dashboard()
    {

        Log::info('Admin dashboard accessed');
        $orders =  $orders = ShippingOrder::with('user')->get();
        $notifications = [
            ['message' => 'Order #123 has been updated.'],
            ['message' => '3 new users registered today.'],
            ['message' => 'Server backup completed.'],
        ];
        return view('admin_dashboard', compact('orders', 'notifications'));
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
