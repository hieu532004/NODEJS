import createError from 'http-errors';
import brandModel from '../models/brand.model';
import { Types } from 'mongoose';

// Định nghĩa kiểu cho payload
interface BrandPayload {
  name: string; // Giả định schema có trường name
  description?: string; // Tùy chọn
  [key: string]: any; // Cho phép thêm trường khác
}

const getAll = async () => {
  const brands = await brandModel.find();
  return brands;
};

const getById = async (id: Types.ObjectId | string) => {
  const brand = await brandModel.findById(id);
  if (!brand) {
    throw createError(404, 'Brand not found');
  }
  return brand;
};

const create = async (payload: BrandPayload) => {
  const brand = new brandModel(payload);
  await brand.save();
  return brand;
};

const updateById = async (id: Types.ObjectId | string, payload: BrandPayload) => {
  const brand = await brandModel.findByIdAndUpdate(id, payload, { new: true });
  if (!brand) {
    throw createError(404, 'Brand not found');
  }
  return brand;
};

const deleteById = async (id: Types.ObjectId | string) => {
  const brand = await brandModel.findByIdAndDelete(id);
  if (!brand) {
    throw createError(404, 'Brand not found');
  }
  return brand;
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};