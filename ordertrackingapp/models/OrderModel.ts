import { OrderStatus } from "@/constants";

export interface OrderModel {
    orderNumber: string;
    pickupLocation: string;
    shippingAddress: string;
    pickupTime: Date;
    deliveryTime: Date;
    status: OrderStatus;
}