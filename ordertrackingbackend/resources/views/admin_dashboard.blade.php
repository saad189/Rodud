<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Orders</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        async function updateStatus(orderId) {
            const status = document.getElementById(`status-${orderId}`).value;
            const response = await fetch(`/admin/orders/${orderId}/update-status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    status
                })
            });

            const result = await response.json();
            if (result.success) {
                alert("Order status updated successfully!")
                location.reload();
            } else {
                alert("Failed to update order status.");
            }
        }
    </script>
</head>

<body class="bg-gray-100 text-gray-900">

    <header class="bg-white shadow p-4 flex justify-between items-center">
        <!-- Left: Logged-in user name -->
        <div class="text-xl font-bold">
            @if($user)
            Hello, {{ $user['name'] }}
            @else
            Admin Dashboard
            @endif
        </div>

        <!-- Right: Logout Button -->
        <form action="/logout" method="POST">
            @csrf
            <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Logout
            </button>
        </form>
    </header>


    <!-- MAIN CONTENT -->
    <div class="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-6 text-center">All Shipping Orders</h1>

        <table class="w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-200 text-left">
                    <th class="border p-3">Order ID</th>
                    <th class="border p-3">User ID</th>
                    <th class="border p-3">Order Number</th>
                    <th class="border p-3">Pickup Location</th>
                    <th class="border p-3">Shipping Location</th>
                    <th class="border p-3">Pickup Date</th>
                    <th class="border p-3">Delivery Date</th>
                    <th class="border p-3">Size</th>
                    <th class="border p-3">Weight</th>
                    <th class="border p-3">Status</th>
                    <th class="border p-3">Update Status</th>
                    <th class="border p-3">Email User</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($orders as $order)
                <tr class="hover:bg-gray-100">
                    <td class="border p-3">{{ $order->id }}</td>
                    <td class="border p-3">{{ $order->user_id }}</td>
                    <td class="border p-3">{{ $order->order_number }}</td>
                    <td class="border p-3">{{ $order->pickup_location }}</td>
                    <td class="border p-3">{{ $order->shipping_location }}</td>
                    <td class="border p-3">{{ $order->pickup_date }}</td>
                    <td class="border p-3">{{ $order->delivery_date }}</td>
                    <td class="border p-3">{{ $order->size }}</td>
                    <td class="border p-3">{{ $order->weight }}</td>
                    <td class="border p-3">
                        <span
                            class="px-2 py-1 rounded
                                   @if($order->status == 'Pending') bg-yellow-300 text-black
                                   @elseif($order->status == 'In Progress') bg-blue-300 text-black
                                   @elseif($order->status == 'Delivered') bg-green-300 text-black
                                   @elseif($order->status == 'Cancelled') bg-red-300 text-white
                                   @endif">
                            {{ $order->status }}
                        </span>
                    </td>
                    <td class="border p-3">
                        <select id="status-{{ $order->id }}" class="border rounded p-2">
                            <option value="Pending" @if($order->status == 'Pending') selected @endif>Pending</option>
                            <option value="In Progress" @if($order->status == 'In Progress') selected @endif>In Progress</option>
                            <option value="Delivered" @if($order->status == 'Delivered') selected @endif>Delivered</option>
                            <option value="Cancelled" @if($order->status == 'Cancelled') selected @endif>Cancelled</option>
                        </select>
                        <button onclick="updateStatus({{ $order->id }})"
                            class="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Update
                        </button>
                    </td>
                    <td class="border p-3 text-center">
                        @if($order->user && $order->user->email)
                        <a href="mailto:{{ $order->user->email }}?subject=Update%20on%20Your%20Order%20%23{{ $order->order_number }}"
                            class="inline-block px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                            Email {{ $order->user->email }}
                        </a>
                        @else
                        <span class="text-gray-400">No Email</span>
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>