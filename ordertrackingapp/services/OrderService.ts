import { CreateOrderModel, OrderModel } from "@/models";
import ApiService from "./api.service";
import { formatErrorMessage, toSnakeCase } from "@/helpers";
import { OrderStatus, PackageSize } from "@/constants";

const orders: OrderModel[] = [
    {
        order_number: 'ORD12345', status: OrderStatus.Pending, pickup_location: 'NYC', shipping_location: 'LA', delivery_date: new Date('2023-10-01'),
        pickup_date: new Date('2023-9-01'),
        size: PackageSize.Small,
        weight: 0
    },
    {
        order_number: 'ORD12346', status: OrderStatus.InProgress, pickup_location: 'Chicago', shipping_location: 'Houston', delivery_date: new Date('2023-10-02'),
        pickup_date: new Date('2023-10-01'),
        size: PackageSize.Medium,
        weight: 0
    },
    {
        order_number: 'ORD12347', status: OrderStatus.Delivered, pickup_location: 'Chicago', shipping_location: 'Houston', delivery_date: new Date('2023-10-03'),
        pickup_date: new Date('2023-10-02'),
        size: PackageSize.Large,
        weight: 0
    },
    {
        order_number: 'ORD12348', status: OrderStatus.Cancelled, pickup_location: 'Chicago', shipping_location: 'Houston', delivery_date: new Date('2023-10-04'),
        pickup_date: new Date('2023-10-03'),
        size: PackageSize.ExtraLarge,
        weight: 0
    },
];

class OrderService {
    private endpoint: string;

    constructor(private readonly apiService: ApiService) {
        this.endpoint = '/shipping-orders';
    }

    // Get all orders for a user
    async getAllUserOrders(): Promise<OrderModel[]> {
        try {
            const { data } = await this.apiService.get<OrderModel[]>(`${this.endpoint}/user`);
            return data;
            // return orders;
        } catch (error: any) {
            throw new Error(formatErrorMessage(error));
        }
    }

    // Add a new order
    async addOrder(order: CreateOrderModel): Promise<boolean> {
        try {
            console.log(order);
            await this.apiService.post(this.endpoint, order);
            return true;
        } catch (error: any) {
            throw new Error(formatErrorMessage(error));
        }
    }

    // Update an existing order
    async updateOrder(orderId: number, order: Partial<OrderModel>): Promise<boolean> {
        try {
            await this.apiService.put(`${this.endpoint}/${orderId}`, order);
            return true;
        } catch (error: any) {
            throw new Error(formatErrorMessage(error));
        }
    }

    // Delete an order
    async deleteOrder(orderId: number): Promise<boolean> {
        try {
            await this.apiService.delete(`${this.endpoint}/${orderId}`);
            return true;
        } catch (error: any) {
            throw new Error(formatErrorMessage(error));
        }
    }
}

const orderService = new OrderService(ApiService);

export default orderService;
