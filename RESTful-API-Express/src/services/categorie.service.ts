import createErrors from 'http-errors';
/**
 * SERVICE
 * - Nhận đầu vào từ controller
 * - Xử lý logic business
 * - Lấy dữ liệu return cho controller
*/
const categories = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Smartphone' }
];

const getAll = () => {
    return categories;
}

const getById = (id: number) => {
    const category = categories.find((category) => category.id === Number(id));
    if (!category) {
        throw createErrors(400, 'Category not found');
    }
    return category;
}

const create = (payload: { id: number, name: string }) => {
    console.log('Received payload:', payload); // 🛠 Debug
    if (!payload || !payload.id || !payload.name) {
        throw createErrors(400, 'Invalid payload');
    }
    categories.push(payload);
    return payload;
}

const updateById = (id: number, payload: { id: number, name: string }) => {
    const categoryIndex = categories.findIndex((category) => category.id === Number(id));
    if (categoryIndex === -1) {
        throw createErrors(400, 'Category not found');
    }
    categories[categoryIndex] = payload;
    return payload;
}

const deleteById = (id: number) => {
    const categoryIndex = categories.findIndex((category) => category.id === Number(id));
    if (categoryIndex === -1) {
        throw createErrors(400, 'Category not found');
    }
    categories.splice(categoryIndex, 1);
}
export default { getAll, getById, create, updateById, deleteById };