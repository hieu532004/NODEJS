import dotenv from "dotenv";
dotenv.config();

/**
 * Dùng file này để quản lý các biến môi trường
 * tập trung 1 chỗ
 */
export const env = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGODB_URI: process.env.MONGODB_URI,
    // env for JWT
    JWT_SECRET: process.env.JWT_SECRET,
    // env for database connection string for TypeORM with SQL Server
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_TYPE: process.env.DB_TYPE,
    DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE,
    DB_LOGGING: process.env.DB_LOGGING,
    DB_ENCRYPT: process.env.DB_ENCRYPT,
}
