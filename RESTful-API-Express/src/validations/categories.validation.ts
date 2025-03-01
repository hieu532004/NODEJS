import * as yup from 'yup';


const getAllSchema = yup
    .object({
        query: yup.object({
            page: yup.number().integer().positive().optional(),//optional: không bắt buộc, integer: số nguyên, positive: số dương
            limit: yup.number().integer().positive().optional(),
            sort_by: yup.string().matches(/^(asc|desc)$/, { message: 'Sort by invalid' }).optional(),//asc: tăng dần, desc: giảm dần
            sort_type: yup.string().matches(/^(createdAt|category_name)$/, { message: 'Sort type invalid' }).optional(),
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
            category_name: yup.string().min(3).max(50).required(),
            description: yup.string().max(255).optional(), // optional: không bắt buộc
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