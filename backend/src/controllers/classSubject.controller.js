import ClassSubject from "../models/ClassSubject.js";

// Add Subject to Class
export const addSubjectToClass = async (req, res) => {
    try {
        const { classId, subjectId } = req.body;

        const existing = await ClassSubject.findOne({ where: { classId, subjectId } });
        if (existing) {
            return res.status(400).json({ success: false, message: "Subject already added to this class" });
        }

        const classSubject = await ClassSubject.create({ classId, subjectId });

        res.status(201).json({
            success: true,
            message: "Subject added to class successfully",
            data: classSubject,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Subjects of a Class
export const getClassSubjects = async (req, res) => {
    try {
        const { classId } = req.params;
        // Yahan aap include kar sakte ho Subject details baad mein
        const subjects = await ClassSubject.findAll({
            where: { classId, deletedAt: null }
        });

        res.json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove Subject from Class
export const removeSubjectFromClass = async (req, res) => {
    try {
        const { id } = req.params;
        await ClassSubject.destroy({ where: { id } });
        res.json({ success: true, message: "Subject removed from class" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};