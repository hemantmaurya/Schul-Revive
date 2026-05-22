import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },

    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "first_name",
        validate: {
            notEmpty: true,
        },
    },

    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "last_name",
        validate: {
            notEmpty: true,
        },
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },

    phone: {
        type: DataTypes.STRING(20),
        validate: {
            is: /^[0-9+\-() ]*$/i,
        },
    },

    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password_hash",
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
        onDelete: "RESTRICT",
    },

    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },

    deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
    },

}, {
    tableName: "users",
    timestamps: true,
    paranoid: true,
    underscored: true,

    indexes: [
        { unique: true, fields: ["email"] },
        { fields: ["role_id"] },
        { fields: ["status"] },
    ],
});

export default User;