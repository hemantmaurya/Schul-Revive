// backend/src/models/Test.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Test = sequelize.define('Test', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Pending'),
        defaultValue: 'Active'
    },
    priority: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

export default Test;