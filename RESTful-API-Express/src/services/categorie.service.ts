import createErrors from 'http-errors';
import categoryModel from '../models/category.model';
import { ICateghoryCreatePayload } from '../types/model';
import { ObjectId } from 'mongoose';
/**
 * SERVICE
 * - Nhận đầu vào từ controller
 * - Xử lý logic business
 * - Lấy dữ liệu return cho controller
*/
const getAll = async () => {
    const categories = await categoryModel.find();
    console.log('<<=====🚀 categories 🚀=====>>', categories); // 🛠 Debug
    return categories;
}

const getById = async (id: ObjectId) => {
   const category = await categoryModel.findById(id);
    if (!category) {
        throw createErrors(400, 'Category not found');
    }
    return category;
}

const create = async (payload: ICateghoryCreatePayload) => {
    console.log('Received payload:', payload); // 🛠 Debug
    // Tao moi category
    const category = new categoryModel(payload);
    // Luu vao db
    await category.save();
    // Tra ve item vua tao
    return payload;
}

const updateById = async (id: ObjectId, payload: ICateghoryCreatePayload) => {
    const category = await categoryModel.findByIdAndUpdate(id, payload, { new: true });
    if (!category) {
        throw createErrors(400, 'Category not found');
    }
    return category;
}

const deleteById = async (id: ObjectId) => {
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
        throw createErrors(400, 'Category not found');
    }
}
export default { getAll, getById, create, updateById, deleteById };