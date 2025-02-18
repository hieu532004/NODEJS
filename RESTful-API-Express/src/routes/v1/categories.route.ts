import express from 'express';
import createErrors from 'http-errors';
const router = express.Router();
const categories = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Smartphone' }
];
//Get All Categories
// GET api/v1/categories
router.get('/categories', (req, res) => {
    // res.send('categories');
    res.status(200).json(categories);
});

//Get Category By Id
router.get('/categories/:id', (req, res) => {
    const { id } = req.params;
    const category = categories.find((category) => category.id === Number(id));
    if (!category) {
        //throw new Error('Category not found');
        throw createErrors(400, 'Category not found');
    }
    res.status(200).json(category);
});
//Create Category
// POST api/v1/categories
router.post('/categories', (req, res) => {
    const category = req.body;
    console.log(category);
    categories.push(category);
    res.status(201).json(category);
});

//Update Category
// PUT api/v1/categories/:id
router.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex((category) => category.id === Number(id));
    if (categoryIndex === -1) {
        throw createErrors(400, 'Category not found');
    }
    const category = req.body;
    categories[categoryIndex] = category;
    res.status(200).json(category);
});

//Delete Category
// DELETE api/v1/categories/:id
router.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex((category) => category.id === Number(id));
    if (categoryIndex === -1) {
        throw createErrors(400, 'Category not found');
    }
    categories.splice(categoryIndex, 1);
    res.status(204).json();
});
export default router;