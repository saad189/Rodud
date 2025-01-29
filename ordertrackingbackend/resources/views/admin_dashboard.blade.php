<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Orders</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Alpine.js (optional, for the notification dropdown) -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        async function updateStatus(orderId) {
            const status = document.getElementById(`status-${orderId}`).value;
            const response = await fetch(`/api/admin/orders/${orderId}/update-status`, {
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
                alert("Order status updated successfully!");
            } else {
                alert("Failed to update order status.");
            }
        }
    </script>
</head>

<body class="bg-gray-100 text-gray-900">

    <!-- HEADER / BANNER -->
    <header class="bg-white shadow p-4 flex justify-between items-center">
        <!-- Left: Logged-in user name -->
        <div class="text-xl font-bold">
            @if(Auth::check())
            Hello, {{ Auth::user()->name }}
            @else
            Admin Dashboard
            @endif
        </div>

        <!-- Right: Notifications Icon / Dropdown -->
        <div class="relative" x-data="{ open: false }">
            <button @click="open = !open" class="relative">
                <!-- Bell icon -->
                <svg class="w-6 h-6 text-gray-600 hover:text-gray-800 transition" fill="none" stroke="currentColor"
                    stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6 6 0 00-5-5.916V4a1 1 0 00-2 0v1.084A6 6 0 006 11v3c0 .528-.214 1.04-.595 1.405L4 17h5m6 0a3 3 0 11-6 0h6z">
                    </path>
                </svg>
                <!-- Example: If you wanted to show a "badge" for new notifications -->
                <!--
                <span class="absolute top-0 right-0 inline-flex items-center
                             justify-center px-2 py-1 text-xs font-bold leading-none
                             text-red-100 bg-red-600 rounded-full">3</span>
                -->
            </button>

            <!-- Dropdown -->
            <div x-show="open" @click.away="open = false"
                class="origin-top-right absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-md p-2">
                <h2 class="font-semibold mb-2">Notifications</h2>
                <ul class="space-y-1">
                    @if(isset($notifications) && count($notifications) > 0)
                    @foreach($notifications as $note)
                    <li class="px-3 py-1 hover:bg-gray-100 rounded cursor-pointer">
                        {{ $note['message'] }}
                    </li>
                    @endforeach
                    @else
                    <li class="px-3 py-1 text-gray-500">No notifications.</li>
                    @endif
                </ul>
            </div>
        </div>
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