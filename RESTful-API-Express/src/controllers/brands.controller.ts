import { httpStatus, sendJSONResponse } from '../helpers/response.helper';
import brandService from '../services/brands.service'; // Đúng tên file
import { NextFunction, Request, Response } from 'express';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = await brandService.getAll();
    sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, brands);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await brandService.getById(req.params.id);
    sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, brand);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const brand = await brandService.create(payload);
    sendJSONResponse(res, httpStatus.CREATED.statusCode, httpStatus.CREATED.message, brand);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const brand = await brandService.updateById(req.params.id, payload);
    sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, brand);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await brandService.deleteById(req.params.id);
    sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, brand);
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