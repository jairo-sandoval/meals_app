const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const Meal = database.define('meals', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    restaurantId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        defaultValue: 'active',
        type: DataTypes.STRING
    }
})

module.exports = { Meal }