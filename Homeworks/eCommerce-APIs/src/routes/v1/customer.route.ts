import { Router } from 'express';
import * as customerController from '../../controllers/customer.controller';
import { customerValidation } from '../../validations/customer.validation';

const router = Router();

router.post('/customer', customerValidation, customerController.createCustomer);
router.get('/customer', customerController.getCustomers);
router.get('/customer/:id', customerController.getCustomerById);
router.put('/customer/:id', customerValidation, customerController.updateCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);

export default router;