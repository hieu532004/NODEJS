import express from "express";
import categoriesController from "../../controllers/categories.controller";
import validateSchemaYup from "../../middlewares/validate.middleware";
import categoryValidation from "../../validations/categories.validation";
const router = express.Router();

router.get('/categories', validateSchemaYup(categoryValidation.getAllSchema), categoriesController.getAll);
router.get('/categories/:id', validateSchemaYup(categoryValidation.getByIdSchema), categoriesController.getById);
router.post('/categories', validateSchemaYup(categoryValidation.createSchema), categoriesController.create);
router.put('/categories/:id', validateSchemaYup(categoryValidation.updateByIdSchema), categoriesController.updateById);
router.delete('/categories/:id', categoriesController.deleteById);

export default router;