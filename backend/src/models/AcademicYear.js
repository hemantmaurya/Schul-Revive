import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AcademicYear = sequelize.define("AcademicYear", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    year_name: {                    // e.g. "2025-26"
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    is_current: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM('active', 'upcoming', 'completed'),
        defaultValue: 'upcoming'
    }
}, {
    tableName: "academic_years",
    timestamps: true,
    paranoid: true,
    underscored: true
});

export default AcademicYear;
