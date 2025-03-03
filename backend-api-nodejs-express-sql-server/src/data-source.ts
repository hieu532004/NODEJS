import "reflect-metadata";
import { DataSource } from 'typeorm';


/**
 * Đọc document tương ứng với databse bạn muốn kết nối 
 * https://typeorm.io/#/connection-options
 */
export const myDataSource = new DataSource({
  type: process.env.DB_TYPE as 'mssql', // Loại Database
  host: process.env.DB_HOST, // Computer Name
  port: parseInt(process.env.DB_PORT || '1433', 10), // Cổng mặc định của server SQL
  username: process.env.DB_USERNAME, // Username Database
  password: process.env.DB_PASSWORD, // Password Database
  database: process.env.DB_DATABASE, // Tên Database
  entities: [process.env.DB_ENTITIES || 'src/entities/*.entity{.ts,.js}'], // Đường dẫn đến entities
  synchronize: process.env.DB_SYNCHRONIZE === 'true', // Đồng bộ với Database
  logging: process.env.DB_LOGGING === 'true', // Ghi log
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // True khi chạy trên production
  },
});