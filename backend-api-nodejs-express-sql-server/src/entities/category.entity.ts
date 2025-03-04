import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import createError from 'http-errors';
import { Length, validateOrReject } from 'class-validator';
import { O } from '@faker-js/faker/dist/airline-BcEu2nRk';
import { Product } from './product.entity';

@Entity({name: 'categories'}) // Tên bảng trong database
export class Category {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        comment: 'Category ID',
    })
    category_id: number;

    @Length(3, 50, { message: 'Category name must be between 3 and 50 characters' })
    @Column({
        type: 'nvarchar',
        length: 50,
        unique: true,
    })
    category_name: string;

    @Column({
        type: 'nvarchar',
        length: 500,
        nullable: true,
    })
    description?: string;

    @Column({
        type: 'nvarchar',
        length: 50,
        unique: true,
    })
    slug: string;

    // relationship
    @OneToMany(() => Product, (p) => p.category)
    products: Product[];

    @BeforeInsert()
    @BeforeUpdate()  
    
    async validate() {
      try {
        await validateOrReject(this);
      } catch (errors) {
        console.log('Caught promise rejection (validation failed). Errors: ', errors);
        throw createError(400, errors);
      }   
    }

    


}