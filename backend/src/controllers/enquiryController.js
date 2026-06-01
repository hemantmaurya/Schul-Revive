// backend/src/controllers/enquiryController.js
import Enquiry from '../models/Enquiry.js';
import { Op } from 'sequelize';

// Get all enquiries with pagination, search & filter
export const getEnquiries = async (req, res) => {
    try {
        const { page = 1, limit = 15, search = '', status = 'All' } = req.query;
        const offset = (page - 1) * parseInt(limit);

        const where = {};
        if (search) {
            where[Op.or] = [
                { studentName: { [Op.iLike]: `%${search}%` } },
                { parentName: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { phone: { [Op.iLike]: `%${search}%` } }
            ];
        }
        if (status !== 'All') {
            where.status = status;
        }

        const { count, rows } = await Enquiry.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single enquiry by ID
export const getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }
        res.json({ success: true, data: enquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new enquiry
export const createEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.create(req.body);
        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            data: enquiry
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update enquiry
export const updateEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }

        await enquiry.update(req.body);
        res.json({
            success: true,
            message: "Enquiry updated successfully",
            data: enquiry
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete enquiry
export const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByPk(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" });
        }

        await enquiry.destroy();
        res.json({ success: true, message: "Enquiry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};