const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

// Vazifa modelini yaratish
const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Bog‘lanishlarni e'lon qilish
User.hasMany(Task, { onDelete: 'CASCADE' }); // User modelidan to‘g‘ri foydalanish
Task.belongsTo(User);

module.exports = Task;
