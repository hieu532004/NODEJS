import express from 'express';
const router = express.Router();
import categoriesController from '../../controllers/categorie.controller';
/* Route để định tuyến Path <===> controller */
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
router.put('/categories/:id', categoriesController.update);

//Delete Category
// DELETE api/v1/categories/:id
router.delete('/categories/:id', categoriesController.deleteById);
export default router;