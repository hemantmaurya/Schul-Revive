import House from "../models/House.js";

// CREATE
export const createHouse = async (req, res) => {
    try {
        const house = await House.create(req.body);
        res.status(201).json({
            success: true,
            message: "House created successfully",
            data: house,
        });
    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ALL
export const getAllHouses = async (req, res) => {
    try {
        const { count, rows } = await House.findAndCountAll({
            where: { deletedAt: null },
            order: [["id", "DESC"]],
            attributes: { exclude: ["deletedAt"] },
        });

        res.json({
            success: true,
            data: rows,
            totalRecords: count,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ONE
export const getHouseById = async (req, res) => {
    try {
        const house = await House.findByPk(req.params.id);
        if (!house || house.deletedAt) {
            return res.status(404).json({ success: false, message: "House not found" });
        }
        res.json({ success: true, data: house });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE
export const updateHouse = async (req, res) => {
    try {
        const house = await House.findByPk(req.params.id);
        if (!house || house.deletedAt) {
            return res.status(404).json({ success: false, message: "House not found" });
        }
        await house.update(req.body);
        res.json({ success: true, message: "House updated", data: house });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE
export const deleteHouse = async (req, res) => {
    try {
        const house = await House.findByPk(req.params.id);
        if (!house || house.deletedAt) {
            return res.status(404).json({ success: false, message: "House not found" });
        }
        await house.destroy();
        res.json({ success: true, message: "House soft deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};