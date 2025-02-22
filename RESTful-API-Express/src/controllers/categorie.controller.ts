import { Request, Response } from 'express';
import categoriesService from '../services/categorie.service';
import { sendJSONResponse } from '../helpers/response.helper';
/* Nhiệm cụ controller:
 - Nhận đầu vào từ router
 - Nhận kết quả từ service tương ứng với đầu vào
 - Response kết quả cho client
 - Không nên xử lý logic nghiệp vụ ở contrller */


const getAll = async (req: Request, res: Response) => {
    const categories = await categoriesService.getAll();
    sendJSONResponse(res, 200, 'Success', categories);
}

const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ObjectId } = require('mongodb');
    const category = await categoriesService.getById(new ObjectId(id));
    res.status(200).json(category);
    sendJSONResponse(res, 200, 'Success', category);
}

const create = (req: Request, res: Response) => {
    const payload = req.body;
    const category = categoriesService.create(payload);
    res.status(200).json(category);
    sendJSONResponse(res, 200, 'Success', category);
}

const update = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const { ObjectId } = require('mongodb');
    const resuft = categoriesService.updateById(new ObjectId(id), payload);
    res.status(200).json(resuft);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { ObjectId } = require('mongodb');
    const resuft = categoriesService.deleteById(new ObjectId(id));

    res.status(200).json(resuft);
}

export default { getAll, getById, create, update, deleteById };
