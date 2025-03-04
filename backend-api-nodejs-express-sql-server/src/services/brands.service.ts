import createError from 'http-errors';
import { Brand } from '../entities/brand.entity';
import { buildSlug } from '../helpers/slugify.helper';
import { myDataSource } from '../data-source';


const brandRepository = myDataSource.getRepository(Brand);

const getAll = async () => {
    const brands = await brandRepository.find();
    return brands;
}

const getById = async (id: number) => {
    return null;
}

const create = async (payload: any) => {
    const brand = await brandRepository.insert({
        brand_name: payload.brand_name,
        description: payload.description,
        slug: buildSlug(payload.brand_name)
    });
    return brand;
}

const updateById = async (id: number, payload: {id: number, name: string}) => {
    return null;
}

const deleteById = async (id: number) => {
    return null;
}


export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}