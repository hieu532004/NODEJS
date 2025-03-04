import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Brand } from "./brand.entity";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn({
      name: 'Id',
    })
    product_id: number;

    @Column({
        type: 'nvarchar',
        length: 50,
        unique: true,
    })
    product_name: string;

    @Column({
        type: 'decimal',
        precision: 18,
        scale: 2,
    })
    price: number;

    @Column({
        type:'decimal',
        precision: 18,
        scale: 2,
        default: 0,
    })
   discount: number;
    
    @Column({
        type:'decimal',
        precision: 18,
        scale: 2,
        default: 0,
    })
    stock: number;

   @Column({
         type: 'nvarchar',
         length:'MAX',
         nullable: true,
   })
    description: string;

    @ManyToOne(() => Category, (c) => c.products,{
        onDelete: 'SET NULL', // Xóa category thì product sẽ không bị xóa 
    })
    category: Category;
    // tạo ra một cột category_id trong bảng products

    @ManyToOne(() => Brand, (b) => b.products,{
        onDelete: 'SET NULL',
    })
    brand: Brand;
}
    