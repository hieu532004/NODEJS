import mongoose from 'mongoose';
import app from './app';
import { env } from './helpers/env.helper';

// Kiểm tra biến môi trường
if (!env.PORT || !env.MONGODB_URI) {
    console.error('PORT hoặc MONGODB_URI không được định nghĩa trong biến môi trường');
    process.exit(1);
}

const PORT = Number(env.PORT); // Đảm bảo PORT là số
const MONGODB_URI = env.MONGODB_URI;

const mongooseDbOptions = {
    autoIndex: true, // Automatically build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
};

// Kết nối MongoDB
mongoose
    .connect(MONGODB_URI, mongooseDbOptions)
    .then(() => {
        console.log('Connected to MongoDB success!', MONGODB_URI);

        // Khởi động server
        const server = app.listen(PORT, () => {
            console.log(`Express Server is running on http://localhost:${PORT}`);
        });

        // Xử lý lỗi kết nối MongoDB sau khi đã kết nối
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            server.close(() => process.exit(1)); // Đóng server nếu MongoDB lỗi
        });
    })
    .catch((err) => {
        console.error('Failed to Connect to MongoDB:', err);
        process.exit(1); // Thoát ứng dụng nếu không kết nối được
    });

// Xử lý khi ứng dụng bị tắt (Ctrl+C)
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});
