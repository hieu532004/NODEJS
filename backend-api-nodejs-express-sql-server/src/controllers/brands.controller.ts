import { NextFunction, Request, Response } from 'express';
import { httpStatus, sendJsonSuccess } from '../helpers/response.helper';
import brandsService from '../services/brands.service';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const brands = await brandsService.getAll();
        sendJsonSuccess(res, brands);
    } catch (error) {
        next(error);
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const brand = await brandsService.getById(Number(id));
        sendJsonSuccess(res, brand);
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const brand = await brandsService.create(payload);
        sendJsonSuccess(res, brand, httpStatus.CREATED.statusCode, httpStatus.CREATED.message)
    } catch (error) {
        next(error);
    }
}

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const brand = await brandsService.updateById(Number(id), payload);
        sendJsonSuccess(res, brand);
    } catch (error) {
        next(error);
    }
}

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const brand = await brandsService.deleteById(Number(id));
        sendJsonSuccess(res, brand);
    } catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}