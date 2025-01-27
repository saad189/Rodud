import { OrderStatus } from "@/constants";

export interface OrderModel {
    id: number;
    userId: number;
    pickupLocation: string;
    shippingAddress: string;
    pickupTime: Date;
    deliveryTime: Date;
    status: OrderStatus;
}