// src/routes/users.ts
import express from 'express';
import { addUser, addUsers } from '../utils/db-helpers';

const router = express.Router();

// Thêm một user
router.post('/', async (req, res) => {
    try {
        const newUser = await addUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
});

// Thêm nhiều user
router.post('/batch', async (req, res) => {
    try {
        const newUsers = await addUsers(req.body);
        res.status(201).json(newUsers);
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
});

export default router;