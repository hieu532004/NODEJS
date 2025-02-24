import express from 'express';
import brandsController from '../../controllers/categories.controller';
const router = express.Router();

//Get All Brands
// GET api/v1/brands
router.get('/brands', brandsController.getAll);

//Get Category By Id
router.get('/brands/:id', brandsController.getById);

//Create Category
// POST api/v1/brands
router.post('/brands', brandsController.create);

//Update Category
// PUT api/v1/brands/:id
router.put('/brands/:id', brandsController.updateById);

//Delete Category
// DELETE api/v1/brands/:id
router.delete('/brands/:id', brandsController.deleteById);

// Tất cả các route được gọi là resource API (RESTful API) = bao gồm các phương thức HTTP: GET, POST, PUT, DELETE

export default router;