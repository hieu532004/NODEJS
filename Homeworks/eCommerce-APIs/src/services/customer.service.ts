import ICustomer, { Customer } from '../models/customer.model';


export const createCustomer = async (data: Partial<ICustomer>): Promise<ICustomer> => {
    const customer = new Customer(data);
    return await customer.save();
};

export const getCustomers = async (): Promise<ICustomer[]> => {
    return await Customer.find();
};

export const getCustomerById = async (id: string): Promise<ICustomer | null> => {
    return await Customer.findById(id);
};

export const updateCustomer = async (id: string, data: Partial<ICustomer>): Promise<ICustomer | null> => {
    return await Customer.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCustomer = async (id: string): Promise<ICustomer | null> => {
    return await Customer.findByIdAndDelete(id);
};