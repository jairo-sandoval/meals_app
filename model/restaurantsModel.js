const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const Restaurant = database.define('restaurants', {
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
    addres: {
        allowNull: false,
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER
    },
    status: {
        defaultValue: 'active',
        type: DataTypes.STRING
    },
})

module.exports = { Restaurant }