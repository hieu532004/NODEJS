import express from "express";
import categoriesController from "../../controllers/categories.controller";
import { categoryValidation } from "../../validations/category.validation";
const router = express.Router();


router.get("/categories", categoriesController.getAll);
router.get("/categories/:id", categoriesController.getById);
router.post("/categories",categoryValidation, categoriesController.create);
router.put("/categories/:id",categoryValidation, categoriesController.updateByID);
router.delete("/categories/:id", categoriesController.deleteById);
export default router;