import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ClassSubject = sequelize.define("ClassSubject", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "class_id",
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "subject_id",
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

export default ClassSubject;