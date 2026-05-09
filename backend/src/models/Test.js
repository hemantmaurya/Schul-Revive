import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Test = sequelize.define("Test", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING,
        field: "middle_name",
    },
    lastName: {
        type: DataTypes.STRING,
        field: "last_name",
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active",
    },
    notes: {
        type: DataTypes.TEXT,
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
        allowNull: true,
    },
}, {
    timestamps: true,
    paranoid: true,           // Enables soft delete
    underscored: true,        // Use snake_case columns
});

export default Test;