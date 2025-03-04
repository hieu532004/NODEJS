import { O } from "@faker-js/faker/dist/airline-BcEu2nRk";
import { Length } from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Product } from "./product.entity";


@Entity({name: 'brands'})
export class Brand {

    @PrimaryGeneratedColumn()
    brand_id: number;

    @Length(3, 50, { message: 'Brand name must be between 3 and 50 characters' })
    @Column({
        type: 'nvarchar',
        length: 50,
        unique: true,
    })
    brand_name: string;

    @Column({
        type: 'nvarchar',
        length: 500,
        nullable: true,
    })
    description: string;

    @Column({
        type: 'nvarchar',
        length: 50,
        unique: true,
    })
    slug: string;

    @OneToMany(() => Product, (p) => p.brand)
    products: Product[];
}