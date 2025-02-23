import createError from 'http-errors';
import brandModel from '../models/brand.model';
import { IBrandCreate } from '../types/model';

/**
 * Service
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu return về controller
 */

const getAll = async()=>{
    const b = await brandModel.find();
    return b;
}

const getById = async (id: number) => {
    const brand = await brandModel.findById(id);
    if (!brand) {
        throw createError(400, 'Brand not found');
    }
    return brand;
}

const create = async (payload: { id: number, name: string }) => {
    const brand = new brandModel(payload)
    await brand.save()
    return brand;
}

const updateById = async (id: number, payload: { id: number, name: string }) => {
    const brand = await brandModel.findByIdAndUpdate(id, payload, { new: true });
    if (!brand) {
        throw createError(400, 'Brand not found');
    }
    return brand;
}

const deleteById = async (id: number) => {
    const brand = await brandModel.findByIdAndDelete(id);
    if (!brand) {
        throw createError(400, 'Brand not found');
    }
    return brand;
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}