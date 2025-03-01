import { ac } from '@faker-js/faker/dist/airline-BcEu2nRk';
import * as yup from 'yup';


const getAllSchema = yup
    .object({
        query: yup.object({
            page: yup.number().integer().positive().optional(),//optional: không bắt buộc, integer: số nguyên, positive: số dương
            limit: yup.number().integer().positive().optional(),
            sort_by: yup.string().matches(/^(asc|desc)$/, { message: 'Sort by invalid' }).optional(),//asc: tăng dần, desc: giảm dần
            sort_type: yup.string().matches(/^(createdAt|last_name)$/, { message: 'Sort type invalid' }).optional(),// last_name: sắp xếp theo last_name của staff thứ tự giảm dần a -> z
            keyword: yup.string().min(3).max(255).optional(), // search by name
        }),
    })
    .required();

const getByIdSchema = yup
    .object({
        params: yup.object({
            id: yup.string().matches(/^[0-9a-fA-F]{24}$/, { message: 'ID is non-Objectid' }).required(),
        }),
    })
    .required();


const createSchema = yup
    .object({
        body: yup.object({
            first_name: yup.string().min(3).max(50).required(),
            last_name: yup.string().min(3).max(50).required(),
            email: yup.string().email().required(),
            password: yup.string().min(6).max(50).required(),
            active: yup.boolean().required(),
        }),
    })
    .required();

const updateByIdSchema = yup
    .object({
        params: yup.object({
            id: yup.string().matches(/^[0-9a-fA-F]{24}$/, { message: 'ID is non-Objectid' }).required(),
        }),
        body: yup.object({
            category_name: yup.string().min(3).max(50).optional(),
            description: yup.string().max(255).optional(),
        }),
    }).required();


const deleteByIdSchema = yup
    .object({
        params: yup.object({
            id: yup.string().matches(/^[0-9a-fA-F]{24}$/, { message: 'ID is non-Objectid' }).required(),
        }),
    })
    .required();



export default {
    createSchema,
    getByIdSchema,
    deleteByIdSchema,
    updateByIdSchema,
    getAllSchema

};