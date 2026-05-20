// backend/src/routes/testRoutes.js
import express from 'express';
import upload from '../middleware/upload.js';
import { getTests, createTest, updateTest, deleteTest } from '../controllers/testController.js';

const router = express.Router();

router.get('/', getTests);
router.post('/', upload.single('image'), createTest);
router.put('/:id', upload.single('image'), updateTest);
router.delete('/:id', deleteTest);

export default router;