import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Permission = sequelize.define("Permission", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },

    description: {
        type: DataTypes.TEXT,
    },

    deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
    },

}, {
    tableName: "permissions",
    timestamps: true,
    paranoid: true,
    underscored: true,

    indexes: [
        { unique: true, fields: ["name"] },
    ],
});

export default Permission;