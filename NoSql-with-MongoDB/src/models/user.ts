import mongoose, { Document, Schema } from 'mongoose';

// Interface mô tả User
export interface IUser extends Document {
    name: string;
    email: string;
    age: number;
    createdAt: Date;
}

// Schema định nghĩa cấu trúc dữ liệu
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Trong file src/models/user.ts

// Thêm vào cuối file, trước khi export model
UserSchema.pre('save', function (next) {
    // Kiểm tra email hợp lệ
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const user = this as unknown as IUser;
    if (!emailRegex.test(user.email)) {
        next(new Error('Email không hợp lệ'));
    } else if (user.age < 0 || user.age > 120) {
        next(new Error('Tuổi không hợp lệ (0-120)'));
    } else {
        next();
    }
});

// Tạo và export model
export const User = mongoose.model<IUser>('User', UserSchema);
export * from './user';
