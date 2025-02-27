import express from "express";
import productsController from "../../controllers/products.controller";
const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.post('/product', productsController.create);
router.put('/product/:id', productsController.updateById);
router.delete('/product/:id', productsController.deleteById);

export default router;