import express from "express";
import categoriesController from "../../controllers/categories.controller";
const router = express.Router();


router.get("/categories", categoriesController.getAll);
router.get("/categories/:id", categoriesController.getById);
router.post("/categories", categoriesController.create);
router.put("/categories/:id", categoriesController.updateByID);
router.delete("/categories/:id", categoriesController.deleteById);
export default router;