const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const Review = database.define('reviews', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    comment: {
        allowNull: false,
        type: DataTypes.STRING
    },
    restaurantId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    rating: {
        allowNull: false,
        type: DataTypes.STRING
    }
})

module.exports = { Review }