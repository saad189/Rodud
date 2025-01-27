import { OrderModel } from "@/models";
import ApiService from "./api.service";
import { formatErrorMessage } from "@/helpers";
import { OrderStatus } from "@/constants";

const orders: OrderModel[] = [
    {
        orderNumber: 'ORD12345', status: OrderStatus.Pending, pickupLocation: 'NYC', shippingAddress: 'LA', deliveryTime: new Date('2023-10-01'),
        pickupTime: new Date('2023-9-01')
    },
    {
        orderNumber: 'ORD12346', status: OrderStatus.InProgress, pickupLocation: 'Chicago', shippingAddress: 'Houston', deliveryTime: new Date('2023-10-02'),
        pickupTime: new Date('2023-10-01')
    },
    {
        orderNumber: 'ORD12347', status: OrderStatus.Delivered, pickupLocation: 'Chicago', shippingAddress: 'Houston', deliveryTime: new Date('2023-10-03'),
        pickupTime: new Date('2023-10-02')
    },
    {
        orderNumber: 'ORD12348', status: OrderStatus.Cancelled, pickupLocation: 'Chicago', shippingAddress: 'Houston', deliveryTime: new Date('2023-10-04'),
        pickupTime: new Date('2023-10-03')
    },
];

class OrderService {
    private endpoint: string;

    constructor(private readonly apiService: ApiService) {
        this.endpoint = '/orders';
    }

    // Get all orders for a user
    async getAllUserOrders(): Promise<OrderModel[]> {
        try {
            // const { data } = await this.apiService.get<OrderModel[]>(`${this.endpoint}/user`);
            //  return data;
            return orders;
        } catch (error: any) {
            throw new Error(formatErrorMessage(error));
        }
    }

    // Add a new order
    async addOrder(order: OrderModel): Promise<boolean> {
        try {
            await this.apiService.post(`${this.endpoint}`, order);
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
