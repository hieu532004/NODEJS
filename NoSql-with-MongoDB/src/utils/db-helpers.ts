import { IUser, User } from '../models/user';

// Thêm một bản ghi
export const addOne = async <T>(model: any, data: Partial<T>): Promise<T> => {
    try {
        const newItem = new model(data);
        return await newItem.save();
    } catch (error) {
        console.error(`Error adding one item to ${model.modelName}:`, error);
        throw error;
    }
};

// Thêm nhiều bản ghi
export const addMany = async <T>(model: any, dataArray: Partial<T>[]): Promise<T[]> => {
    try {
        return await model.insertMany(dataArray);
    } catch (error) {
        console.error(`Error adding multiple items to ${model.modelName}:`, error);
        throw error;
    }
};

// Ví dụ hàm tiện ích dành riêng cho User
export const addUser = async (userData: Partial<IUser>): Promise<IUser> => {
    return await addOne<IUser>(User, userData);
};

export const addUsers = async (usersData: Partial<IUser>[]): Promise<IUser[]> => {
    return await addMany<IUser>(User, usersData);
};