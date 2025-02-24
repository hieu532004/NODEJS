import categoryModel from "../models/category.model";
import createHttpError from "http-errors";

// Định nghĩa kiểu cho payload (nếu cần)
interface CategoryPayload {
    [key: string]: any; // Có thể cải tiến kiểu cụ thể hơn dựa trên schema
}

const getAll = async () => {
    const categories = await categoryModel.find();
    return categories;
};

const getById = async (id: string) => { // Chuẩn hóa kiểu string
    const category = await categoryModel.findById(id);
    if (!category) {
        throw createHttpError(404, 'Category not found');
    }
    return category;
};

const create = async (payload: CategoryPayload) => {
    const category = new categoryModel(payload);
    await category.save();
    return category;
};

const updateById = async (id: string, payload: CategoryPayload) => {
    const category = await categoryModel.findByIdAndUpdate(id, payload, { new: true });
    if (!category) {
        throw createHttpError(404, 'Category not found');
    }
    return category;
};

const deleteById = async (id: string) => {
    const category = await categoryModel.findByIdAndDelete(id); // Thêm await
    if (!category) {
        throw createHttpError(404, 'Category not found');
    }
    return category;
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};