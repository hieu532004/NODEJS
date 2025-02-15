import mongoose from 'mongoose';

// URI kết nối MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';

// Cấu hình kết nối
export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

// Xử lý sự kiện đóng kết nối
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Xử lý khi process kết thúc
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});