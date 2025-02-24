import { Router } from 'express';
import * as staffController from '../../controllers/staff.controller';
import { staffValidation } from '../../validations/staff.validation';

const router = Router();

router.post('/staff', staffValidation, staffController.createStaff);
router.get('/staff', staffController.getStaffs);
router.get('/staff/:id', staffController.getStaffById);
router.put('/staff/:id', staffValidation, staffController.updateStaff);
router.delete('/staff/:id', staffController.deleteStaff);

export default router;