import express from "express";
import {
    testingSave,
    getTestingAll,
    getTestingById,
    testingUpdate,
    testingDelete,
} from "../controllers/test.controller.js";

const router = express.Router();

router.post("/", testingSave);
router.get("/", getTestingAll);
router.get("/:id", getTestingById);
router.put("/:id", testingUpdate);
router.delete("/:id", testingDelete);

export default router;