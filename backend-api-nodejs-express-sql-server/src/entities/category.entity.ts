import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import slugify from 'slugify';
import createError from 'http-errors';
import { validateOrReject } from 'class-validator';

@Entity('categories') // Tên bảng trong database
export class Category {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        comment: 'Category ID',
    })
    category_id: number;

    @Column({
        type: 'nvarchar',
        length: 50,
        nullable: false,
        unique: true,
        comment: 'Category Name',
    })
    category_name: string;

    @Column({
        type: 'nvarchar',
        length: 500,
        nullable: true,
        comment: 'Category Description',
    })
    description?: string;

    @Column({
        type: 'nvarchar',
        length: 50,
        nullable: false,
        unique: true,
        comment: 'Category Slug',
    })
    slug: string;

    @BeforeInsert()
    @BeforeUpdate()  
    generateSlug() {
        this.slug = slugify(this.category_name, {
            lower: true,        // Chuyển thành chữ thường
            strict: true,       // Loại bỏ ký tự đặc biệt
            remove: /[*+~.()'"!:@]/g, // Loại bỏ các ký tự không mong muốn
            replacement: '-',   // Thay khoảng trắng bằng dấu gạch ngang
        });

        // Cắt ngắn slug nếu vượt quá 50 ký tự
        if (this.slug.length > 50) {
            this.slug = this.slug.substring(0, 50);
        }

        // Loại bỏ dấu gạch ngang ở cuối nếu có
        this.slug = this.slug.replace(/-+$/, '');
    }
    
    async validate() {
      try {
        await validateOrReject(this);
      } catch (errors) {
        console.log('Caught promise rejection (validation failed). Errors: ', errors);
        throw createError(400, errors);
      }   
    }



}