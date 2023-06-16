const User = require('./User'); 
const Income = require('./Income');
const Expense = require('./Expense');
const Debt = require('./Debt');

// I don't know how they'd be related yet.... is this right?
User.hasMany(Income, {
    foreignKey: 'userId', 
    onDelete: 'CASCADE'
});
User.hasMany(Expense, {
    foreignKey: 'userId', 
    onDelete: 'CASCADE'
});
User.hasMany(Debt, {
    foreignKey: 'userId', 
    onDelete: 'CASCADE'
});
Debt.hasMany(Payments,{
foreignKey: 'debtId'
});

Income.belongsTo(User, {
    foreignKey: 'userId'
});
Expense.belongsTo(User, {
    foreignKey: 'userId'
});
Debt.belongsTo(User, {
    foreignKey: 'userId'
});
Payments.belongsTo(Debt,{
    foreignKey: 'debtId'
});


module.exports = { User, Income, Expense, Debt };