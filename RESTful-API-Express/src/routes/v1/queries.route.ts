import express from "express";
const router = express.Router();
import Product from "../../models/product.model";

// GET /api/v1/queries
router.get("/queries", async (req, res) => {
    console.log('queries');
    const currentPage = 1; //trang hiện tại
    const pageSize = 10; // Số lượng items trên 1 trang

    const product = await Product
        .find({
            product_name: new RegExp(/Silk/, 'i') //ten sp co chua ki tu
        })
        .populate('category', "category_name") //join voi categories collection
        .populate('brand_id')
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
    res.json(product)
});

export default router;