const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const Order = database.define('order', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    mealId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    totalPrice: {
        
        type: DataTypes.INTEGER
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        defaultValue: 'active',
        type: DataTypes.STRING
    },
})

module.exports = { Order }