import Subject from "../models/Subject.js";

// ========================
// CREATE SUBJECT
// ========================
export const createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json({
            success: true,
            message: "Subject created successfully",
            data: subject,
        });
    } catch (error) {
        console.error("Create Subject Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// GET ALL SUBJECTS
// ========================
export const getAllSubjects = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Subject.findAndCountAll({
            where: { deletedAt: null },
            order: [["id", "DESC"]],
            limit,
            offset,
            attributes: { exclude: ["deletedAt"] },
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalRecords: count,
                limit,
            },
        });
    } catch (error) {
        console.error("Get Subjects Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// GET SUBJECT BY ID
// ========================
export const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject || subject.deletedAt) {
            return res.status(404).json({ success: false, message: "Subject not found" });
        }
        res.json({ success: true, data: subject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// UPDATE SUBJECT
// ========================
export const updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject || subject.deletedAt) {
            return res.status(404).json({ success: false, message: "Subject not found" });
        }

        await subject.update(req.body);
        res.json({
            success: true,
            message: "Subject updated successfully",
            data: subject,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// DELETE SUBJECT
// ========================
export const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByPk(req.params.id);
        if (!subject || subject.deletedAt) {
            return res.status(404).json({ success: false, message: "Subject not found" });
        }

        await subject.destroy();
        res.json({
            success: true,
            message: "Subject soft deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};