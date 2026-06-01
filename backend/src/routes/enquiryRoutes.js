// backend/src/routes/enquiryRoutes.js
import express from 'express';
import {
    getEnquiries,
    getEnquiryById,
    createEnquiry,
    updateEnquiry,
    deleteEnquiry
} from '../controllers/enquiryController.js';

const router = express.Router();

router.get('/', getEnquiries);
router.get('/:id', getEnquiryById);
router.post('/', createEnquiry);
router.put('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);

export default router;