import brandsService from "../services/brand.service";
import { NextFunction, Request, Response } from 'express';
import { httpStatus, sendJSONResponse } from '../helpers/response.helper';   
const getAll = async (req: Request, res: Response) => {
    const brands = await brandsService.getAll();
    // res.status(200).json(brands);
    sendJSONResponse(res, 200, 'Success', brands);
}

const getById =  (req: Request, res: Response) => {
    const { id } = req.params;
    const { ObjectId } = require('mongodb');
    const brand =  brandsService.getById(new ObjectId(id));
    // res.status(200).json(brand);
    sendJSONResponse(res, 200, 'Success', brand);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const brand = await brandsService.create(payload);
    // res.status(200).json(brand);
    sendJSONResponse(res, 200, 'Success', brand);
  } catch (error) {
    next(error);
  }
}

const update = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const { ObjectId } = require('mongodb');
    const result = brandsService.updateById(new ObjectId(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { ObjectId } = require('mongodb');
    const result = brandsService.deleteById(new ObjectId(id));
    res.status(200).json(result);
}

export default { getAll, getById, create, update, deleteById };
// Compare this snippet from RESTful-API-Express/src/routes/v2/brands.route.ts: