import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RolePermission = sequelize.define("RolePermission", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },

    roleId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "role_id",
        references: {
            model: "roles",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

    permissionId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        field: "permission_id",
        references: {
            model: "permissions",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },

    deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
    },

}, {
    tableName: "role_permissions",
    timestamps: true,
    paranoid: true,
    underscored: true,

    indexes: [
        {
            unique: true,
            fields: ["role_id", "permission_id"], // composite unique
        },
    ],
});

export default RolePermission;