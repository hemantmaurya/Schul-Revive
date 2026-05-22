import Course from "../models/Course.js";

// ========================
// CREATE
// ========================
export const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// READ ALL - With Pagination
// ========================
export const getAllCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Course.findAndCountAll({
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
        console.error("Read Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// READ ONE
// ========================
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course || course.deletedAt) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// UPDATE
// ========================
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course || course.deletedAt) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        await course.update(req.body);
        res.json({
            success: true,
            message: "Course updated successfully",
            data: course,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// SOFT DELETE
// ========================
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course || course.deletedAt) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        await course.destroy();
        res.json({
            success: true,
            message: "Course soft deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};