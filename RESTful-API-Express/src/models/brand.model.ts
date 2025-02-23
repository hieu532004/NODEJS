import { Schema, model } from "mongoose";

const brandSchema = new Schema({
    brand_name: { type: String, required: true, unique: true, minlength: 3, maxlength: 50, trim: true },
    description: { type: String, maxLength: 1000, trim: true, default: '' },
},
    {
        timestamps: true, // tự động thêm 2 trường thời gian tạo và cập nhật
        versionKey: false, // không tự động thêm trường _v
        collection: 'brand' // tên của collection trong MongoDB

    });
export default model('Brand', brandSchema);