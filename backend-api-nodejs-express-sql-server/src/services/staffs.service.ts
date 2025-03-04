import createError from 'http-errors';
import { myDataSource } from '../data-source';
import { Staff } from '../entities/staff.entity';

const staffRepository = myDataSource.getRepository(Staff);

const getAll = async (query: any) => {
    const { page = 1, limit = 10, sort_type = 'desc', sort_by = 'createdAt', staff_name, staff } = query;

    const sortObject = { [sort_by]: sort_type === 'desc' ? 'DESC' : 'ASC' };

    const where: any = {};
    if (staff_name) {
        where.staff_name = { $regex: staff_name, $options: 'i' };
    }
    if (staff) {
        where.staff = staff;
    }

    const [staffs, total] = await staffRepository.findAndCount({
        where,
        order: sortObject,
        skip: (page - 1) * limit,
        take: limit,
    });

    return { staffs, total, page, limit };
};

const getById = async (id: number) => {
    const staff = await staffRepository.findOneBy({ staff_id: id });
    if (!staff) {
        throw createError(400, 'Staff not found');
    }
    return staff;
};

const create = async (payload: any) => {
    const staff = staffRepository.create(payload);
    await staffRepository.save(staff);
    return staff;
};

const updateById = async (id: number, payload: any) => {
    const staff = await getById(id);

    const staffExist = await staffRepository.createQueryBuilder('staff')
        .where('staff.email = :email', { email: payload.email })
        .andWhere('staff.staff_id != :id', { id })
        .getOne();

    if (staffExist) {
        throw createError(400, 'Email already exists');
    }

    Object.assign(staff, payload);
    await staffRepository.save(staff);
    return staff;
};

const deleteById = async (id: number) => {
    const staff = await getById(id);
    await staffRepository.remove(staff);
    return staff;
};

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
