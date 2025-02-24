import express from 'express';
import createErrors from 'http-errors';
import categoriesController from '../../controllers/categories.controller';
const router = express.Router();

//Get All Categories
// GET api/v1/categories
router.get('/categories', categoriesController.getAll);

//Get Category By Id
router.get('/categories/:id', categoriesController.getById);

//Create Category
// POST api/v1/categories
router.post('/categories', categoriesController.create);

//Update Category
// PUT api/v1/categories/:id
router.put('/categories/:id', categoriesController.updateById);

//Delete Category
// DELETE api/v1/categories/:id
router.delete('/categories/:id', categoriesController.deleteById);

// Tất cả các route được gọi là resource API (RESTful API) = bao gồm các phương thức HTTP: GET, POST, PUT, DELETE

export default router;