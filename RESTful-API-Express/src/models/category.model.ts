import { Schema, model } from 'mongoose';

//ĐỊnh nghĩa cấu trúc của collection category
const categorySchema = new Schema({
    category_name: { type: String, required: true,  },
    description: { type: String, required: true },
});

export default model('Category', categorySchema);