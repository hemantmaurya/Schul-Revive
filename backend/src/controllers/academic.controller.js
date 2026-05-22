import AcademicYear from "../models/AcademicYear.js";
import Semester from "../models/Semester.js";

// ======================== ACADEMIC YEAR CRUD ========================

// Create Academic Year
export const createAcademicYear = async (req, res) => {
    try {
        const year = await AcademicYear.create(req.body);
        res.status(201).json({
            success: true,
            message: "Academic Year created successfully",
            data: year
        });
    } catch (error) {
        console.error("Create Academic Year Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Academic Years
export const getAllAcademicYears = async (req, res) => {
    try {
        const years = await AcademicYear.findAll({
            order: [['start_date', 'DESC']]
        });
        res.json({ success: true, data: years });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Single Academic Year
export const getAcademicYearById = async (req, res) => {
    try {
        const year = await AcademicYear.findByPk(req.params.id);
        if (!year) return res.status(404).json({ success: false, message: "Academic Year not found" });
        res.json({ success: true, data: year });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Academic Year
export const updateAcademicYear = async (req, res) => {
    try {
        const year = await AcademicYear.findByPk(req.params.id);
        if (!year) return res.status(404).json({ success: false, message: "Academic Year not found" });

        await year.update(req.body);
        res.json({
            success: true,
            message: "Academic Year updated successfully",
            data: year
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Academic Year (Soft Delete)
export const deleteAcademicYear = async (req, res) => {
    try {
        const year = await AcademicYear.findByPk(req.params.id);
        if (!year) return res.status(404).json({ success: false, message: "Academic Year not found" });

        await year.destroy();
        res.json({ success: true, message: "Academic Year deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ======================== SEMESTER CRUD ========================

// Create Semester
export const createSemester = async (req, res) => {
    try {
        const semester = await Semester.create(req.body);
        res.status(201).json({
            success: true,
            message: "Semester created successfully",
            data: semester
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Semesters
export const getAllSemesters = async (req, res) => {
    try {
        const semesters = await Semester.findAll({
            include: [{ model: AcademicYear, attributes: ['year_name'] }],
            order: [['academic_year_id', 'ASC'], ['semester_number', 'ASC']]
        });
        res.json({ success: true, data: semesters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Semesters by Academic Year
export const getSemestersByYear = async (req, res) => {
    try {
        const { year_id } = req.params;
        const semesters = await Semester.findAll({
            where: { academic_year_id: year_id },
            order: [['semester_number', 'ASC']]
        });
        res.json({ success: true, data: semesters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Semester
export const updateSemester = async (req, res) => {
    try {
        const semester = await Semester.findByPk(req.params.id);
        if (!semester) return res.status(404).json({ success: false, message: "Semester not found" });

        await semester.update(req.body);
        res.json({
            success: true,
            message: "Semester updated successfully",
            data: semester
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Semester (Soft Delete)
export const deleteSemester = async (req, res) => {
    try {
        const semester = await Semester.findByPk(req.params.id);
        if (!semester) return res.status(404).json({ success: false, message: "Semester not found" });

        await semester.destroy();
        res.json({ success: true, message: "Semester deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
