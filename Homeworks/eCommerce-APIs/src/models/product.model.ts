import { Schema, model, Document, Types } from "mongoose";
import { generateSlug } from '../helpers/slugify.helper'

interface IProduct extends Document {
    product_id: number;
    product_name: string;
    price: number;
    discount: number;
    category_id: Types.ObjectId;
    brand_id: Types.ObjectId;
    description?: string;
    model_year: number;
    slug?: string;
    thumbnail?: string;
    stock: number;
}
const productSchema = new Schema<IProduct>({
    product_id: { type: Number, required: true, unique: true },
    product_name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, max: 70, default: 0 },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand_id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    description: { type: String },
    model_year: { type: Number, required: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    stock: { type: Number, required: true, min: 0, default: 0 }
});

productSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = generateSlug(this.product_name);
    }
    next();
});

export default model<IProduct>("Product", productSchema);