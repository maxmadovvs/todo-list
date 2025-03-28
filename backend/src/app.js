const express = require('express'); // Express.js kutubxonasini chaqiramiz
const cors = require('cors'); // CORS siyosatini boshqarish uchun kutubxona
const dotenv = require('dotenv'); // Atrof-muhit o'zgaruvchilarini yuklash uchun dotenv
const swaggerUI = require('swagger-ui-express'); // Swagger UI uchun express moduli
const swaggerSpec = require('./docs/swagger'); // Swagger konfiguratsiyasi
const sequelize = require('./config/db'); // MySQL bazasi bilan bog‘lanish uchun Sequelize konfiguratsiyasi
const authRoutes = require('./routes/authRoutes'); // Auth (ro‘yxatdan o‘tish, login) marshrutlari
const taskRoutes = require('./routes/taskRoutes'); // Task (vazifalar) marshrutlari
const userRoutes = require('./routes/userRoutes'); // User (foydalanuvchilar) marshrutlari
const { User, Task } = require('./models'); // Model obyektlari

dotenv.config(); // .env faylidan konfiguratsiyalarni yuklash

const app = express(); // Express ilovasini yaratamiz

// Swagger konfiguratsiyasi - API hujjatlarini yaratish va ko‘rish
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); // Swagger hujjatlarini ko‘rsatish uchun middleware

// Middleware'lar
app.use(cors()); // CORS muammolarini oldini olish uchun
app.use(express.json()); // JSON formatidagi ma’lumotlarni qabul qilish uchun

// Root route
app.get('/', (req, res) => {
    res.send('API ishga tushdi');
});

// API marshrutlarini ulash
app.use('/api/auth', authRoutes); // Autentifikatsiya (login, ro‘yxatdan o‘tish) uchun marshrutlar
app.use('/api/tasks', taskRoutes); // Vazifalar bilan ishlash uchun marshrutlar
app.use('/api/user', userRoutes); // Foydalanuvchilar bilan bog‘liq marshrutlar

// Serverni ishga tushirish
const PORT = process.env.PORT || 6420; // Portni .env dan olish yoki 6420 ga sozlash
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate(); // MySQL bazasiga ulanishni tekshirish
        console.log(`✅ MySQLga muvaffaqiyatli ulandi`); // Muvoffaqiyatli ulanish haqida xabar
        await sequelize.sync({ force: false }); // force: false - mavjud jadval ma’lumotlarini o‘chirmaydi
        console.log(`🚀 Server ${PORT}-portda ishlayapti`); // Server ishga tushishi haqida xabar
        console.log('🗒  Swagger hujjatlar: http://localhost:6420/api-docs'); // Swagger hujjatlari manzili
    } catch (error) {
        console.error('❌ MySQL ulanishida xatolik:', error); // Xatolik haqida xabar
    }
});
