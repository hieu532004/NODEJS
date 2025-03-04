import createError from 'http-errors';
import { Category } from '../entities/category.entity';
import { buildSlug } from '../helpers/slugify.helper';
import { myDataSource } from '../data-source';


const categoryRepository = myDataSource.getRepository(Category);

const getAll = async (query: any) => {
    const categories = await categoryRepository.find();
    return categories;
}

const getById = async (id: number) => {
    const category = await categoryRepository.findOne({
        where: { category_id: id }
    });
    if (!category) {
        throw createError(400, 'Category not found');
    }
    return category;
}

const create = async (payload: any) => {
    const category = await categoryRepository.insert({
        category_name: payload.category_name,
        description: payload.description,
        slug: buildSlug(payload.category_name)
    });
    return category;
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