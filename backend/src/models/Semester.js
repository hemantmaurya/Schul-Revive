import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import AcademicYear from "./AcademicYear.js";

const Semester = sequelize.define("Semester", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    academic_year_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AcademicYear,
            key: 'id'
        }
    },
    semester_number: {           // 1, 2, 3, 4, 5, 6, 7, 8
        type: DataTypes.INTEGER,
        allowNull: false
    },
    semester_name: {             // e.g. "Odd Semester 2025", "Even Semester 2025-26"
        type: DataTypes.STRING(100),
        allowNull: false
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
        type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
        defaultValue: 'upcoming'
    }
}, {
    tableName: "semesters",
    timestamps: true,
    paranoid: true,
    underscored: true
});

// Associations
Semester.belongsTo(AcademicYear, { foreignKey: 'academic_year_id' });
AcademicYear.hasMany(Semester, { foreignKey: 'academic_year_id' });

export default Semester;
