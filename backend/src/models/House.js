import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const House = sequelize.define("House", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    houseName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "house_name",
    },
    houseColour: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "house_colour",   // e.g., "#FF5733" or "Red"
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

export default House;