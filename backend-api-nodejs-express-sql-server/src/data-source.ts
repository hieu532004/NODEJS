import "reflect-metadata";
import { DataSource } from 'typeorm';


/**
 * Đọc document tương ứng với databse bạn muốn kết nối 
 * https://typeorm.io/#/connection-options
 */
export const myDataSource = new DataSource({
  type: 'mssql', //Loại database
  host: 'HIEUPC', //Computer Name /IP server
  port: 1433, //cổng mặc định của server database
  username: 'hieudev', //username database
  password: '123456789', // mk database
  database: 'LearnNodejs', //Tên Database
  entities: ['src/entities/*.entity{.ts,.js}'], //Chỉ rõ thư mục chứa các file entity
  synchronize: true, //Đồng bộ với Database
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});