const { handleAsync } = require("../utils/handleAsync")
const { Meal } = require('../model/mealModel')

const getAllMeals = handleAsync(async(req, res, next) => {
    const meals = await Meal.findAll()

    res.status(200).json({ 
        status: 'success',
        meals 
    }) 
})

const getMealById = handleAsync(async(req, res, next) => {
    const { meal } = req

    res.status(200).json({
        status: 'success',
        meal
    })
})

const createMeal = handleAsync(async(req, res, next) => {
    const { id } = req.params
    const { name, price } = req.body

    const newMeal = await Meal.create({name, price, restaurantId: id})    

    res.status(201).json({
        status: 'success',
        newMeal
    })
})

const updateMeal = handleAsync(async(req, res, next) => {
    const {meal} = req
    const {name, price} = req.body

    await meal.update({name, price})
    res.status(200).json({
        status: 'success'
    })
})

const deleteMeal = handleAsync(async(req, res, next) => {
    const {meal} = req

    await meal.update({status: 'disabled'})
    
    res.status(200).json({
        status: 'success'
    })
})

module.exports = { 
    getAllMeals, 
    getMealById, 
    createMeal, 
    updateMeal, 
    deleteMeal
}