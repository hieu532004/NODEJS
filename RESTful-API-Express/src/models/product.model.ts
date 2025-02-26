import { Schema, model } from "mongoose";
import slugify from "slugify";

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Phải nhập 3 kí tự trở lên'],
        maxlength: [255, "Tên sản phẩm không được vượt quá 255 kí tự"],
        trim: true,
    },
    price: {
        type: Number,
        required: false,
        min: 0,
        default: 0,
    },
    discount: {
        type: Number,
        required: false,// không yêu cầu điền 
        min: 0,
        max: 70,
        default: 0,
    },
    description: {
        type: String,
        maxlength: 255,
        required: false,
        trim: true,
    },
    model_year: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        min: 0,
        default: 10,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255,
        trim: true,
        lowercase: true
    },
    thumbnail: {
        type: String,
        required: false,
        maxlength: 255,
        trim: true, // cắt ký tự trắng ở đàu và cuối chuỗi
    },
    //tham chieu
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',// tham chieu toi id cua model category
        required: true
    },
    brand_id: {
        type: Schema.Types.ObjectId,
        ref: 'brand', // tham chieu den id model brand
        required: true
    }
}, {
    timestamps: true, // Tự động sinh ra hai trường createAt và updateAt
    versionKey: false, // bỏ đi trường __v
    collection: "products" // tùy chỉnh tên collection để tiện quản lý
})

export default model('Product', productSchema);