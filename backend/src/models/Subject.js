import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Subject = sequelize.define("Subject", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subjectName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "subject_name",
    },
    subjectCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "subject_code",
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "course_id",
    },
    credits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4,
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

export default Subject;