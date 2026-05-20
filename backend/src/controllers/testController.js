// backend/src/controllers/testController.js
import Test from '../models/Test.js';
import { Op } from 'sequelize';

export const getTests = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const offset = (page - 1) * parseInt(limit);

        const where = search ? {
            [Op.or]: [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ]
        } : {};

        const { count, rows } = await Test.findAndCountAll({
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

export const createTest = async (req, res) => {
    try {
        const testData = { ...req.body };
        if (req.file) {
            testData.image = `/uploads/${req.file.filename}`;
        }

        const test = await Test.create(testData);
        res.status(201).json({ success: true, data: test });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateTest = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        const testData = { ...req.body };
        if (req.file) {
            testData.image = `/uploads/${req.file.filename}`;
        }

        await test.update(testData);
        res.json({ success: true, data: test });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteTest = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (!test) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        await test.destroy();
        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};