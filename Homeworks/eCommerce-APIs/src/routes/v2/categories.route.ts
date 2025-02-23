import express from 'express';
const router = express.Router();

// Get All Categories
router.get('/categories', (req, res) => {
    res.send('Get All Categories');
});

// Get Category By Id
router.get('/categories/:id', (req, res) => {
    res.send('Get Category By Id');
});

// Create Category
router.post('/categories', (req, res) => {
    res.send('Create Category');
});

// Update Category
router.put('/categories/:id', (req, res) => {
    res.send('Update Category');
});

// Delete Category
router.delete('/categories/:id', (req, res) => {
    res.send('Delete Category');
});

export default router;