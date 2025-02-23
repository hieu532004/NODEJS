import createError from 'http-errors';
import categoryModel from '../models/category.model';
import { ICategoryCreate } from '../types/model';
import { ObjectId } from 'mongoose';
/**
 * Service
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu return về controller
 */

const getAll = async()=>{
    const categories = await categoryModel.find();
    console.log('<<=====🚀 categories 🚀=====>>', categories);
    return categories;
}

const getById = async(id: string)=>{
    //const category = categories.find(category => category.id == Number(id));
    const category = await categoryModel.findById(id)
    //Nếu không tìm thấy category thì trả về lỗi 404
    if(!category){
        //throw new Error('Category not found');
        throw createError(400, 'Category not found');
    }
    return category;
}

const create = async(payload: ICategoryCreate)=>{
    const category = new categoryModel(payload);
    await category.save();
    return category;
}

const updateById = async (id: string, payload: ICategoryCreate) => {
    const category = await categoryModel.findById(id);
    if (!category) {
        throw createError(400, 'Category not found');
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(id, payload, { new: true });
    return updatedCategory;
}

const deleteById = async (id: string) => {
    const category = await categoryModel.findById(id);
    if (!category) {
        throw createError(400, 'Category not found');
    }
    await categoryModel.findByIdAndDelete(id);
    return category;
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}