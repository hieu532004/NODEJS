import express from "express";
import productsController from "../../controllers/products.controller";
const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.post('/products', productsController.create);
router.put('/products/:id', productsController.updateById);
router.delete('/products/:id', productsController.deleteById);

export default router;