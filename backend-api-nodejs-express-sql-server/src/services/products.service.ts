import createError from 'http-errors';
import { Product } from '../entities/product.entity';
import { buildSlug } from '../helpers/slugify.helper';
import { myDataSource } from '../data-source';



const productRepository = myDataSource.getRepository(Product);

const getAll = async (query: any) => {
    const [products, totalCount] = await productRepository.findAndCount({
        select: {
            product_id: true,
            product_name: true,
            price: true,
            discount: true,
            stock: true,
            category: {
                category_name: true
            },
            brand: {
                brand_name: true
            }
        },
         relations: {
            category: true,
            brand: true
         },
         order: {
             product_id: 'DESC'
         },
        skip: 0,
        take: 10
     });

    return {
        pagination: {
            total: totalCount,
            page: 1,
            limit: 10
        },
        products
    };
};

const getById = async (id: number) => {
    const product = await productRepository.findOne({
        select: {
            product_id: true,
            product_name:true,
            price: true,
            discount: true,
            stock: true,
            category: {
                category_name: true
            },
            brand: {
                brand_name: true
            }
        },
        where: {
            product_id: id
        },
    });
    if (!product) {
        throw createError(400, 'Product not found');
    }
    return product;
}

const create = async (payload: any) => {
    //check tồn tại tên sản phẩm
    const product = await productRepository.insert(payload);
    return product;
}

const updateById = async (id: number, payload: any) =>{
    //Kiem tinh ton tai truoc
   const product = await getById(id);
    // cập nhật merge object
    Object.assign(product, payload);
    //save lại
    const updated = await productRepository.save(product);
    return updated;    
}

const deleteById = async(id: number)=>{
    //Kiem tinh ton tai truoc
    const product = await getById(id);
    //Xóa
    await productRepository.delete({ 
        product_id: product.product_id 
      });
    return product;
}


export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}