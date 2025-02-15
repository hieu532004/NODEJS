import { connectToDatabase } from './config/database';
import { User, IUser } from './models/user';
import express from 'express';
import userRoutes from './routes/users';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Hàm thêm mới một user
export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Hàm thêm nhiều user cùng lúc
export const createManyUsers = async (usersData: Partial<IUser>[]): Promise<IUser[]> => {
    try {
        return await User.insertMany(usersData) as IUser[];
    } catch (error) {
        console.error('Error creating multiple users:', error);
        throw error;
    }
};

// Hàm khởi tạo ứng dụng
export const initializeApp = async (): Promise<void> => {
    // Kết nối đến MongoDB
    await connectToDatabase();

    // Test tạo một user mới
    try {
        // Tạo một user
        const newUser = await createUser({
            name: 'Test User',
            email: 'test@example.com',
            age: 25
        });
        console.log('Created test user successfully:', newUser);

        // Tạo nhiều user cùng lúc
        const usersToAdd = [
            { name: 'User 1', email: 'user1@example.com', age: 30 },
            { name: 'User 2', email: 'user2@example.com', age: 28 },
            { name: 'User 3', email: 'user3@example.com', age: 35 }
        ];

        const addedUsers = await createManyUsers(usersToAdd);
        console.log('Added multiple users successfully:', addedUsers);

        // Lấy danh sách users
        const users = await User.find();
        console.log(`Total users in database: ${users.length}`);
    } catch (error) {
        console.error('Error working with users:', error);
    }
};