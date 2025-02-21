import createHttpError from "http-errors";

const brands = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Samsung' }
];

const getAll = () => {
    return brands;
}

const getById = (id: number) => {
    const brand = brands.find((brand) => brand.id === Number(id));
    if (!brand) {
        throw createHttpError(400, 'Brand not found');
    }
    return brand;
}

const create = (payload: { id: number, name: string }) => {
    console.log('Received payload:', payload); // 🛠 Debug
    if (!payload || !payload.id || !payload.name) {
        throw createHttpError(400, 'Invalid payload');
    }
    brands.push(payload);
    return payload;
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