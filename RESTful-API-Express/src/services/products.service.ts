import createHttpErorr from "http-errors";
import productModel from "../models/product.model";

const getAll = async (query: any) => {

    //Lấy ra các tham số truyền vào
    //page = query.page, nếu page không tồn tại thì mặc định là 1
    const { page = 1, limit = 10, sort_type = 'desc', sort_by = 'createdAt' } = query;

    //Nếu tồn tại sortType và sortBy thì sẽ sắp xếp theo sortType và sortBy
    //Nếu không tồn tại thì sẽ sắp xếp theo createdAt
    let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };

    console.log('<<=== 🚀sortObject  ===>>', sortObject);

    //Tìm kiếm theo điều kiện
    let where = {};
    //Nếu có tìm kiếm theo tên sản phẩm
    if (query.product_name && query.product_name.length > 0) {
        where = { ...where, product_name: { $regex: query.product_name, $options: 'i' } };
    }
    //Nếu tìm kiếm theo danh mục
    if (query.category && query.category.length > 0) {
        where = { ...where, category: query.category };
    }
    //Nếu tìm kiếm theo thương hiệu
    if (query.brand_id && query.brand_id.length > 0) {
        where = { ...where, brand_id: query.brand_id };
    }

    //Thêm các điều kiện khác nếu cần

    const products = await productModel
        .find(where)
        .populate('category', 'category_name')
        .populate('brand_id', 'brand_name')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ ...sortObject });

    //Đếm tổng số record hiện có của collection Product
    const count = await productModel.countDocuments(where);

    return {
        products,
        //Để phân trang
        pagination: {
            totalRecord: count,
            limit,
            page
        }
    };
};

const getById = async (id: String) => {
    const product = await productModel.findById(id)
    if (!product) {
        throw createHttpErorr(400, 'Product not found');
    }
    return product;
}

const create = async (payload: any) => {
    //Kiểm tra xem có tồn tại sản phâm trùng nhau hay không
    const productExist = await productModel.findOne({ product_name: payload.product_name });
    if (productExist) {
        throw createHttpErorr(400, 'Product already exists')
    }
    //Tạo sản phẩm mới
    // const product = new productModel(payload); // không nên làm theo cách này
    /**
     * Nên chi tiết các trường ra để tránh client gửi và lưu trữ dữa liệu không mong muốn 
     */
    const product = new productModel({
        product_name: payload.product_name,
        price: payload.price,
        discount: payload.payload,
        description: payload.description,
        model_year: payload.model_year,
        stock: payload.stock,
        slug: payload.slug,
        thumbnail: payload.thumbnail,
        category: payload.category,
        brand_id: payload.brand_id,
    })
    await product.save();
    return product;
}

const updateById = async (id: string, payload: any) => {
    //Kiểm tra xem sản phẩm có tồn tại không xét = id
    const product = await getById(id);
    /**
     * Kiểm tra xem tên sản phẩm bạn vừa đổi có khác với tên sản phẩm hiện tại không
     * Nếu khác thì kiểm tra xem có sản phẩm nào khác có tên giống không
     */
    const productExist = await productModel.findOne({ product_name: payload.product_name })
    if (productExist) {
        throw createHttpErorr(400, 'Product already exisis')
    }
    Object.assign(product, payload) // Trộn dữ liệu
    await product.save();
    return product;
}

const deleteById = async (id: String) => {

    //Kiểm tra xem xản phẩm có tồn tại hay không bằng id 
    const product = await getById(id);
    //Xóa sản phẩm 
    await productModel.deleteOne({ _id: product._id });
    return product;
}

export default { getAll, getById, create, updateById, deleteById }