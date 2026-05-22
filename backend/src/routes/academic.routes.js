import express from "express";

const router = express.Router();

// Test Route - This should work immediately
router.get("/test", (req, res) => {
    res.json({ 
        success: true, 
        message: "Academic Routes are working!" 
    });
});

// Create Academic Year
router.post("/years", (req, res) => {
    res.json({ 
        success: true, 
        message: "Create Academic Year route working", 
        receivedData: req.body 
    });
});

// Create Semester
router.post("/semesters", (req, res) => {
    res.json({ 
        success: true, 
        message: "Create Semester route working", 
        receivedData: req.body 
    });
});

export default router;
