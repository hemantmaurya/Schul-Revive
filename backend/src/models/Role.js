import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    display_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "roles",
    timestamps: true,
    paranoid: true,        // soft delete (deleted_at)
    underscored: true
});

export default Role;
