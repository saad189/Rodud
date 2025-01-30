import { OrderStatus, PackageSize } from "@/constants";

export interface OrderModel {
    order_number: string;
    pickup_location: string;
    shipping_location: string;
    pickup_date: Date;
    delivery_date: Date;
    status: OrderStatus;
    comments?: string;
    size: PackageSize;
    weight: number;
}

export interface CreateOrderModel {
    pickup_location: string;
    shipping_location: string;
    pickup_date: Date;
    delivery_date: Date;
    comments?: string;
    size: PackageSize;
    weight: number;
}