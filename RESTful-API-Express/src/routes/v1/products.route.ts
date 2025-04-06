import express from "express";
import productsController from "../../controllers/products.controller";
import { authenticateToken } from "../../middlewares/auth.middleware";
const router = express.Router();

router.get('/products', authenticateToken, productsController.getAll);
router.get('/products/:id', authenticateToken, productsController.getById);
router.post('/products', authenticateToken, productsController.create);
router.put('/products/:id', authenticateToken, productsController.updateById);
router.delete('/products/:id', authenticateToken, productsController.deleteById);

export default router;