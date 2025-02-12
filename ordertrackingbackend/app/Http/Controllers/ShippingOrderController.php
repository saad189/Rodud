<?php

namespace App\Http\Controllers;

use App\Models\ShippingOrder;
use Illuminate\Http\Request;
use App\Models\User;
use App\Notifications\NewOrderNotification;

class ShippingOrderController extends Controller
{
    /**
     * Get all orders.
     */
    public function getAllOrders()
    {
        $orders = ShippingOrder::all();

        return response()->json($orders, 200);
    }
    /**
     * Get all orders for a specific user.
     */
    public function getUserOrders(Request $request)
    {
        $userId = $request->user()->id; // Assuming the user is authenticated
        $orders = ShippingOrder::where('user_id', $userId)->get();

        return response()->json($orders, 200);
    }

    /**
     * Add a new order.
     */
    public function addOrder(Request $request)
    {

        $validatedData = $request->validate([
            'pickup_location' => 'required|string',
            'shipping_location' => 'required|string',
            'pickup_date' => 'required|date',
            'delivery_date' => 'required|date|after_or_equal:pickup_date',
            'size' => 'required|in:Small,Medium,Large,Extra Large',
            'weight' => 'required|numeric',
        ]);

        $userId = $request->user()->id;

        // Create the order first (order_number is NULL for now)
        $order = ShippingOrder::create(array_merge($validatedData, [
            'user_id' => $userId,
            'status' => 'Pending', // Default status
        ]));

        // Generate and update order_number based on user_id and order_id
        $order->order_number = $this->generateOrderNumber($userId, $order->id);
        $order->save(); // Save the updated order_number

        $this->sendNotification($order);

        return response()->json(['success' => true, 'order' => $order], 201);
    }

    private function generateOrderNumber($userId, $orderId)
    {
        return "u{$userId}o{$orderId}";
    }

    private function sendNotification($order)
    {
        $admins = User::where('is_admin', 1)->get();
        foreach ($admins as $admin) {
            $admin->notify(new NewOrderNotification($order, $admin));
        }
    }


    /**
     * Update an existing order.
     */
    public function updateOrder(Request $request, $id)
    {
        $order = ShippingOrder::findOrFail($id);

        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'pickup_location' => 'sometimes|string',
            'shipping_location' => 'sometimes|string',
            'pickup_date' => 'sometimes|date',
            'delivery_date' => 'sometimes|date|after_or_equal:pickup_date',
            'status' => 'sometimes|in:In Progress,Cancelled,Delivered,Pending',
            'size' => 'sometimes|in:Small,Medium,Large,Extra Large',
            'weight' => 'sometimes|numeric',
        ]);

        $order->update($validatedData);

        return response()->json(['success' => true, 'order' => $order], 200);
    }

    /**
     * Delete an order.
     */
    public function deleteOrder(Request $request, $id)
    {
        $order = ShippingOrder::findOrFail($id);

        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $order->delete();

        return response()->json(['success' => true], 200);
    }
}
