const express = require('express'); // Express kutubxonasini chaqiramiz
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} = require('../controllers/taskController'); // TaskController dan kerakli funksiyalarni import qilish
const authMiddleware = require('../middleware/authMiddleware'); // Foydalanuvchini autentifikatsiyadan o‘tkazish middleware'ini chaqirish

const router = express.Router(); // Express router obyektini yaratamiz

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Vazifalar (Tasks) bilan ishlash API-lari
 */

/**
 * @swagger
 * /api/tasks/add:
 *   post:
 *     summary: Yangi vazifa yaratish
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Kitob o‘qish"
 *               description:
 *                 type: string
 *                 example: "Har kuni 30 daqiqa kitob o‘qish"
 *     responses:
 *       201:
 *         description: Vazifa muvaffaqiyatli yaratildi
 *       400:
 *         description: Noto‘g‘ri ma’lumot
 *       500:
 *         description: Server xatosi
 */
router.post('/add', authMiddleware, createTask); // Yangi vazifa yaratish

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Foydalanuvchining barcha vazifalarini olish
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Har bir sahifadagi vazifalar soni
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Saralash tartibi
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, title, createdAt]
 *           example: createdAt
 *         description: Qaysi ustun bo‘yicha saralash (id, title, createdAt)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Vazifa nomi yoki tavsifini qidirish
 *     responses:
 *       200:
 *         description: Vazifalar ro‘yxati
 *       500:
 *         description: Server xatosi
 */
router.get('/', authMiddleware, getTasks); // Barcha vazifalarni olish

/**
 * @swagger
 * /api/tasks/edit/{id}:
 *   put:
 *     summary: Vazifani yangilash
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vazifa ID si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Kitob o‘qish"
 *               description:
 *                 type: string
 *                 example: "Har kuni 30 daqiqa kitob o‘qish"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Vazifa muvaffaqiyatli yangilandi
 *       404:
 *         description: Vazifa topilmadi
 *       500:
 *         description: Server xatosi
 */
router.put('/edit/:id', authMiddleware, updateTask); // Vazifani yangilash

/**
 * @swagger
 * /api/tasks/delete/{id}:
 *   delete:
 *     summary: Vazifani o‘chirish
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vazifa ID si
 *     responses:
 *       200:
 *         description: Vazifa muvaffaqiyatli o‘chirildi
 *       404:
 *         description: Vazifa topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete('/delete/:id', authMiddleware, deleteTask); // Vazifani o‘chirish

module.exports = router; // Routerni eksport qilish
