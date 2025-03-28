const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ro‘yxatdan o‘tish funksiyasi
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Email orqali foydalanuvchini tekshirish
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res
                .status(400)
                .json({ message: 'Bu email allaqachon ro‘yxatdan o‘tgan' });

        // Parolni xesh qilish
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yangi foydalanuvchini yaratish
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'Ro‘yxatdan o‘tish muvaffaqiyatli!',
            userId: user.id,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error });
    }
};

// Tizimga kirish funksiyasi
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Foydalanuvchini topish
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(400).json({ message: 'Email yoki parol xato' });

        // Kiritilgan parolni tekshirish
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Email yoki parol xato' });

        // JWT token yaratish
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d', // Tokenning amal qilish muddati 1 kun
        });

        res.json({ message: 'Tizimga muvaffaqiyatli kirdingiz!', token });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error });
    }
};
