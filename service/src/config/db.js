const { Sequelize } = require('sequelize');
require('dotenv').config();

// MySQL bazasiga ulanish uchun Sequelize obyektini yaratish
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', // MySQL ishlatilayotganini belgilash
        logging: false, // Console log'larni o‘chirish (so'rovlarni konsolga chiqarilishini oldini oladi)
    }
);

module.exports = sequelize;
