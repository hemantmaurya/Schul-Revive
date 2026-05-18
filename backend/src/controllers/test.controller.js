import Test from "../models/Test.js";
import Role from "../models/Role.js";


// ========================
// CREATE
// ========================
export const testingSave = async (req, res) => {
    try {
        const test = await Test.create(req.body);
        res.status(201).json({
            success: true,
            message: "Record created successfully",
            data: test,
        });
    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// READ ALL - With Pagination
// ========================
export const getTestingAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Test.findAndCountAll({
            where: { deletedAt: null }, // Only active records
            order: [["id", "DESC"]],
            limit: limit,
            offset: offset,
            attributes: { exclude: ["deletedAt"] },
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalRecords: count,
                limit: limit,
            },
        });
    } catch (error) {
        console.error("Read Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// READ ONE
// ========================
export const getTestingById = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (!test || test.deletedAt) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }
        res.json({ success: true, data: test });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// UPDATE
// ========================
export const testingUpdate = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (!test || test.deletedAt) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        await test.update(req.body);
        res.json({
            success: true,
            message: "Record updated successfully",
            data: test,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// SOFT DELETE
// ========================
export const testingDelete = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (!test || test.deletedAt) {
            return res.status(404).json({ success: false, message: "Record not found" });
        }

        await test.destroy(); // Soft delete (paranoid: true)
        res.json({
            success: true,
            message: "Record soft deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};