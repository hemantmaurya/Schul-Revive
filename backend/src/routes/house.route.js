import express from "express";
import {
    createHouse,
    getAllHouses,
    getHouseById,
    updateHouse,
    deleteHouse,
} from "../controllers/house.controller.js";

const router = express.Router();

router.post("/", createHouse);
router.get("/", getAllHouses);
router.get("/:id", getHouseById);
router.put("/:id", updateHouse);
router.delete("/:id", deleteHouse);

export default router;