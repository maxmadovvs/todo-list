const Task = require('../models/Task');
const User = require('../models/User');

// Vazifa yaratish funksiyasi
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId; // Middleware orqali keladi

        const task = await Task.create({ title, description, UserId: userId });

        res.status(201).json({
            message: "Vazifa muvaffaqiyatli qo'shildi!",
            task,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error });
    }
};

const { Op } = require('sequelize');

// Foydalanuvchining vazifalarini olish funksiyasi
exports.getTasks = async (req, res) => {
    try {
        const userId = req.userId;
        let { page, limit, sortBy, order, search } = req.query;

        page = Number(page);
        limit = Number(limit);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;
        if (limit > 100) limit = 100;

        const offset = (page - 1) * limit;

        const validSortFields = ['title', 'createdAt', 'id'];
        sortBy = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        order = order === 'asc' ? 'ASC' : 'DESC';

        let searchCondition = search
            ? {
                  [Op.or]: [
                      { title: { [Op.like]: `%${search}%` } },
                      { description: { [Op.like]: `%${search}%` } },
                  ],
              }
            : {};

        const { count, rows } = await Task.findAndCountAll({
            where: { UserId: userId, ...searchCondition },
            limit,
            offset,
            order: [[sortBy, order]],
        });

        res.json({
            totalTasks: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            tasks: rows,
        });
    } catch (error) {
        console.error('Vazifalarni olishda xato:', error);
        res.status(500).json({ message: 'Server xatosi', error });
    }
};

// Vazifani yangilash funksiyasi
exports.updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const { id } = req.params;
        const userId = req.userId;

        const task = await Task.findOne({ where: { id, UserId: userId } });
        if (!task) return res.status(404).json({ message: 'Vazifa topilmadi' });

        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed !== undefined ? completed : task.completed;
        await task.save();

        res.status(200).json({
            message: "Vazifa muvaffaqiyatli o'zgartirildi!",
            task,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error });
    }
};

// Vazifani o‘chirish funksiyasi
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const task = await Task.findOne({ where: { id, UserId: userId } });
        if (!task) return res.status(404).json({ message: 'Vazifa topilmadi' });

        await task.destroy();
        res.status(200).json({ message: 'Vazifa o‘chirildi!' });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error });
    }
};
