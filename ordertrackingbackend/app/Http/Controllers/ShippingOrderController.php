<?php

namespace App\Http\Controllers;

use App\Models\ShippingOrder;
use Illuminate\Http\Request;

class ShippingOrderController extends Controller
{

    /**
     * get all orders
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
            'order_number' => 'required|string|unique:shipping_orders,order_number',
            'pickup_location' => 'required|string',
            'shipping_location' => 'required|string',
            'pickup_date' => 'required|date',
            'delivery_date' => 'required|date|after_or_equal:pickup_date',
            'status' => 'required|in:In Progress,Cancelled,Delivered,Pending',
            'size' => 'required|in:Small,Medium,Large,Extra Large',
            'weight' => 'required|numeric',
        ]);

        $order = ShippingOrder::create(array_merge($validatedData, ['user_id' => $request->user()->id]));

        return response()->json(['success' => true, 'order' => $order], 201);
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
