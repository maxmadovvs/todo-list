const jwt = require('jsonwebtoken');

// Middleware funksiyasi: foydalanuvchini autentifikatsiya qilish
module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    // Tokenni tekshirish
    if (!token) return res.status(401).json({ message: 'Ruxsat berilmagan!' });

    try {
        // Tokenni dekodlash
        const decoded = jwt.verify(
            token.replace('Bearer ', ''), // "Bearer" prefiksini olib tashlash
            process.env.JWT_SECRET // Maxfiy kalit yordamida tokenni tekshirish
        );

        req.userId = decoded.userId; // ID ni so‘rovga qo‘shish
        next();
    } catch (error) {
        res.status(401).json({ message: 'Noto‘g‘ri token!' });
    }
};
