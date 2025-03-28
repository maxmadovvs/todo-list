const User = require('./User');
const Task = require('./Task');

User.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(User);

module.exports = { User, Task };
