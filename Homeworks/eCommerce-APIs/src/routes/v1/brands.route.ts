import express from "express";
import brandsController from "../../controllers/brands.controller";
import { brandValidation } from "../../validations/brand.validation";
const router = express.Router();



router.get("/brands", brandsController.getAll);
router.get("/brands/:id", brandsController.getById);
router.post("/brands",brandValidation, brandsController.create);
router.put("/brands/:id",brandValidation, brandsController.updateByID);
router.delete("/brands/:id", brandsController.deleteById);
export default router;