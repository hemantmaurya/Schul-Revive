import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },

    roleName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: "role_name",
        validate: {
            notEmpty: true,
        },
    },

    deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
    },

}, {
    tableName: "roles",
    timestamps: true,
    paranoid: true,
    underscored: true,

    indexes: [
        { unique: true, fields: ["role_name"] },
    ],
});

export default Role;