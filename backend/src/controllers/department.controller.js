import Department from "../models/Department.js";

// ========================
// CREATE
// ========================
export const createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json({
            success: true,
            message: "Department created successfully",
            data: department,
        });
    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// READ ALL - With Pagination
// ========================
export const getAllDepartments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Department.findAndCountAll({
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
export const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department || department.deletedAt) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }
        res.json({ success: true, data: department });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// UPDATE
// ========================
export const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department || department.deletedAt) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        await department.update(req.body);
        res.json({
            success: true,
            message: "Department updated successfully",
            data: department,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ========================
// SOFT DELETE
// ========================
export const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department || department.deletedAt) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        await department.destroy();
        res.json({
            success: true,
            message: "Department soft deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};