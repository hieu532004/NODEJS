import { Request, Response, NextFunction } from 'express';
import { httpStatus, sendJSONResponse } from '../helpers/response.helper';
import categoryService from '../services/categories.service'; // Sửa đường dẫn

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAll();
    sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, categories);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryService.getById(req.params.id);
    sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, category);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryService.create(req.body);
    sendJSONResponse(res, httpStatus.CREATED.statusCode, httpStatus.CREATED.message, category);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const brand = await categoryService.updateById(req.params.id, payload);
    sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, brand);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryService.deleteById(req.params.id);
    sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, category);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};