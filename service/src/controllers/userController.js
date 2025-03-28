const bcrypt = require('bcrypt');
const User = require('../models/User');

// Foydalanuvchi profilini olish funksiyasi
exports.getProfile = async (req, res) => {
    try {
        // Foydalanuvchini topish va ma'lumotlarini olish
        const user = await User.findByPk(req.userId, {
            attributes: ['id', 'username', 'email', 'createdAt'],
        });

        if (!user)
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error });
    }
};

// Foydalanuvchi akkauntini o‘chirish funksiyasi
exports.deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;

        // Foydalanuvchini topish
        const user = await User.findByPk(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        // Kiritilgan parolni tekshirish
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Noto‘g‘ri parol' });
        }

        // Foydalanuvchini o‘chirish
        await user.destroy();

        res.json({ message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error });
    }
};
