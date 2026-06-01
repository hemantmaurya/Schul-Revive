// backend/src/models/Enquiry.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Enquiry = sequelize.define('Enquiry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentName: { type: DataTypes.STRING },
    parentName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    dateOfBirth: { type: DataTypes.DATEONLY },
    classInterested: { type: DataTypes.STRING },
    previousSchool: { type: DataTypes.STRING },
    message: { type: DataTypes.TEXT },
    status: {
        type: DataTypes.ENUM('Pending', 'Contacted', 'Confirmed', 'Rejected'),
        defaultValue: 'Pending'
    }
}, {
    timestamps: true
});

export default Enquiry;