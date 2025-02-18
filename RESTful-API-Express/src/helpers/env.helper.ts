import dotenv from 'dotenv';
dotenv.config();

// dùng file này để quản lý các biến môi trường tập trung tại đây
export const env = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
};