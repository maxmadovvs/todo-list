const express = require('express');
const { getProfile, deleteAccount } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilar bilan bog‘liq API-lar
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Foydalanuvchi profilingi olish
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi profili ma'lumotlari
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "testuser"
 *                 email:
 *                   type: string
 *                   example: "test@example.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     summary: Foydalanuvchi akkauntini o‘chirish
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o‘chirildi
 *       401:
 *         description: Autentifikatsiya talab qilinadi
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatosi
 */
router.delete('/delete', authMiddleware, deleteAccount);

module.exports = router;
