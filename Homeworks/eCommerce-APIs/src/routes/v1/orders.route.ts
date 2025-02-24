import { Router } from 'express';
import * as orderController from '../../controllers/order.controller';
import { orderValidation } from '../../validations/order.validation';

const router = Router();

router.post('/order', orderValidation, orderController.createOrder);
router.get('/order', orderController.getOrders);
router.get('/order/:id', orderController.getOrderById);
router.put('/order/:id', orderValidation, orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

export default router;