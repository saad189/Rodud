import { OrderStatus, PackageSize } from "@/constants";

export interface OrderModel {
    orderNumber: string;
    pickupLocation: string;
    shippingLocation: string;
    pickupDate: Date;
    deliveryDate: Date;
    status: OrderStatus;
    comments?: string;
    size: PackageSize;
    weight: number;
}

export interface CreateOrderModel {
    pickupLocation: string;
    shippingLocation: string;
    pickupDate: Date;
    deliveryDate: Date;
    comments?: string;
    size: PackageSize;
    weight: number;
}