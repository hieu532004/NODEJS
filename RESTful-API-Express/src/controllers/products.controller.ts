import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { httpStatus, sendJSONResponse } from '../helpers/response.helper'
import productsService from '../services/products.service'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productsService.getAll(req.query);
        sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, products)
    } catch (error) {
        next(error)
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productsService.getById(req.params.id)
        sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, product)
    } catch (error) {
        next(error)
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    const { payload } = req.body
    const product = await productsService.create(payload)
    sendJSONResponse(res, httpStatus.CREATED.statusCode, httpStatus.CREATED.message, product)
}

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { payload } = req.body
        const product = await productsService.updateById(id, payload)
        sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, product)
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req:Request, res:Response, next: NextFunction)=>{
    try {
        const {id} = req.params
        const product = await productsService.deleteById(id)
        sendJSONResponse(res, httpStatus.OK.statusCode, httpStatus.OK.message, product)
    } catch (error) {
        next(error)
    }
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}