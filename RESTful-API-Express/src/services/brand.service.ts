import createHttpError from "http-errors";
import testModel from "../models/test.model";
import brandModel from "../models/brand.model";
import { ObjectId } from "mongoose";
import { ICateghoryCreatePayload } from "../types/model";

const brands = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Samsung' }
];

const getAll = async () => {
    const brands = await brandModel.find();
    console.log('<<=====🚀 brands 🚀=====>>', brands); // 🛠 Debug
    return brands;
}

const getById = async (id: ObjectId) => {
    const brand = await brandModel.findById(id);
    if (!brand) {
        throw createHttpError(400, 'Brand not found');
    }   
}

const create = async (payload: ICateghoryCreatePayload ) => {
     console.log('<<=====🚀 payload =====>>',payload);// 🛠 Debug
    const brand = await brandModel.create(payload);
    return brand;
}

const updateById = (id: number, payload: { id: number, name: string }) => {
    const brandIndex = brands.findIndex((brand) => brand.id === Number(id));
    if (brandIndex === -1) {
        throw createHttpError(400, 'Brand not found');
    }
    brands[brandIndex] = payload;
    return payload;
}

const deleteById = (id: number) => {
    const brandIndex = brands.findIndex((brand) => brand.id === Number(id));
    if (brandIndex === -1) {
        throw createHttpError(400, 'Brand not found');
    }
    brands.splice(brandIndex, 1);
}

export default { getAll, getById, create, updateById, deleteById };
// Compare this snippet from RESTful-API-Express/src/routes/v2/brands.route.ts: