import { Order } from '../models/order.model';
import IOrder from '../models/order.model';

export const createOrder = async (data: Partial<IOrder>): Promise<IOrder> => {
    const order = new Order(data);
    return await order.save();
};

export const getOrders = async (): Promise<IOrder[]> => {
    return await Order.find().populate('customer_id staff_id order_items.product_id');
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
    return await Order.findById(id).populate('customer_id staff_id order_items.product_id');
};

export const updateOrder = async (id: string, data: Partial<IOrder>): Promise<IOrder | null> => {
    return await Order.findByIdAndUpdate(id, data, { new: true });
};

export const deleteOrder = async (id: string): Promise<IOrder | null> => {
    return await Order.findByIdAndDelete(id);
};