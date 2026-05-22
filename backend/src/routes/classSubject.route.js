import express from "express";
import {
    addSubjectToClass,
    getClassSubjects,
    removeSubjectFromClass,
} from "../controllers/classSubject.controller.js";

const router = express.Router();

router.post("/", addSubjectToClass);                    // Add subject
router.get("/:classId", getClassSubjects);              // Get all subjects of a class
router.delete("/:id", removeSubjectFromClass);          // Remove subject

export default router;