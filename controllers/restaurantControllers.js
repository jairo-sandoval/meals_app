const { Meal } = require("../model/mealModel")
const { Restaurant } = require("../model/restaurantsModel")
const { handleAsync } = require("../utils/handleAsync")

const getAllRestaurants = handleAsync(async(req, res, next) => {
    const restaurants = await Restaurant.findAll({ 
        include: {model: Meal},
        where: { status: 'active' }})

    res.status(200).json({
        status: 'success',
        restaurants
    })
})

const getRestaurantById = (req, res, next) => {
    const { restaurant } = req

    res.status(200).json({
        status: 'success',
        restaurant
    })
}

const createRestaurant = handleAsync(async(req, res, next) => {
    const { name, addres, rating } = req.body

    const newRestaurant = await Restaurant.create({name, addres, rating})

    res.status(201).json({
        status: 'success',
        newRestaurant
    })
})

const updateRestaurant = handleAsync(async(req, res, next) => {
    const {restaurant} = req
    const {name, addres} = req.body

    await restaurant.update({name, addres})
    res.status(200).json({
        status: 'success'
    })
})

const deleteRestaurant = handleAsync(async(req, res, next) => {
    const {restaurant} = req

    await restaurant.update({status: 'disabled'})
    
    res.status(200).json({
        status: 'success'
    })
})

module.exports = { 
    getAllRestaurants, 
    getRestaurantById, 
    createRestaurant, 
    updateRestaurant,
    deleteRestaurant,
}
