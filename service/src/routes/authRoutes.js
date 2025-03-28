const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Foydalanuvchi autentifikatsiyasi uchun endpointlar
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Foydalanuvchini ro‘yxatdan o‘tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi
 *       400:
 *         description: Email allaqachon mavjud
 *       500:
 *         description: Server xatosi
 */
router.post('/register', register); // Ro‘yxatdan o‘tish

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchini tizimga kiritish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login muvaffaqiyatli yakunlandi
 *       400:
 *         description: Email yoki parol noto‘g‘ri
 *       500:
 *         description: Server xatosi
 */
router.post('/login', login); // Login

module.exports = router;
