import { Request, Response } from 'express';
import createErrors from 'http-errors';
import categoriesService from '../services/categorie.service';
import { sendJSONResponse } from '../helpers/response.helper';
/* Nhiệm cụ controller:
 - Nhận đầu vào từ router
 - Nhận kết quả từ service tương ứng với đầu vào
 - Response kết quả cho client
 - Không nên xử lý logic nghiệp vụ ở contrller */


const getAll = (req: Request, res: Response) => {
    const categories = categoriesService.getAll();
    sendJSONResponse(res, 200, 'Success', categories);
}

const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const Category = categoriesService.getById(Number(id));
    res.status(200).json(Category);
}

const create = (req: Request, res: Response) => {
    const payload = req.body;
    const category = categoriesService.create(payload);
    res.status(200).json(category);
}

const update = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const resuft = categoriesService.updateById(Number(id), payload);
    res.status(200).json(resuft);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const resuft = categoriesService.deleteById(Number(id));

    res.status(200).json(resuft);
}

export default { getAll, getById, create, update, deleteById };
