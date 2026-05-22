import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Course = sequelize.define("Course", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "course_name",
    },
    courseCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "course_code",
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "department_id",
    },
    duration: {
        type: DataTypes.STRING,        // e.g., "3 Years", "2 Years", "4 Semesters"
    },
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
});

export default Course;