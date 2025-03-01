import express from "express";
import staffsController from "../../controllers/staffs.controller";
import validateSchemaYup from "../../middlewares/validate.middleware";
import staffValidation from "../../validations/staffs.validation";
const router = express.Router();

router.get('/staffs', validateSchemaYup(staffValidation.getAllSchema), staffsController.getAll);
router.get('/staffs/:id', validateSchemaYup(staffValidation.getByIdSchema), staffsController.getById);
router.post('/staffs', validateSchemaYup(staffValidation.createSchema), staffsController.create);
router.put('/staffs/:id', validateSchemaYup(staffValidation.updateByIdSchema), staffsController.updateById);
router.delete('/staffs/:id', staffsController.deleteById);

export default router;