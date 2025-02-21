import brandsService from "../services/brand.service";
import { Request, Response } from 'express';
import { httpStatus, sendJSONResponse } from '../helpers/response.helper';

const getAll = (req: Request, res: Response) => {
    const brands = brandsService.getAll();
    // res.status(200).json(brands);
    sendJSONResponse(res, 200, 'Success', brands);
}

const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const brand = brandsService.getById(Number(id));
    res.status(200).json(brand);
}

const create = (req: Request, res: Response) => {
    const payload = req.body;
    const brand = brandsService.create(payload);
    // res.status(200).json(brand);
    sendJSONResponse(res, httpStatus.CREATED.statusCode, httpStatus.CREATED.message, brand);
}

const update = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = brandsService.updateById(Number(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const result = brandsService.deleteById(Number(id));
    res.status(200).json(result);
}

export default { getAll, getById, create, update, deleteById };