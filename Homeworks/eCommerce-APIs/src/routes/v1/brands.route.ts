import express from "express";
import brandsController from "../../controllers/brands.controller";
const router = express.Router();



router.get("/brands", brandsController.getAll);
router.get("/brands/:id", brandsController.getById);
router.post("/brands", brandsController.create);
router.put("/brands/:id", brandsController.updateByID);
router.delete("/brands/:id", brandsController.deleteById);
export default router;