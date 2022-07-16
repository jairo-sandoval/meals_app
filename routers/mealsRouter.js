const express = require('express')
const { getAllMeals, getMealById, createMeal, updateMeal, deleteMeal } = require('../controllers/mealControllers')
const { protectSession } = require('../middlewares/authMiddleware')
const { mealExist } = require('../middlewares/mealMiddlewares')
const { restaurantExist } = require('../middlewares/restaurantMiddleware')
const { checkRoleUser } = require('../middlewares/userMiddlewares')

const router = express.Router()

router.get('/', getAllMeals)

router.get('/:id', mealExist, getMealById)

router.use(protectSession)

router.post('/:id', restaurantExist, createMeal)

router.use(checkRoleUser)

router.route('/:id')
    .patch(mealExist, updateMeal)
    .delete(mealExist, deleteMeal)

module.exports = { mealRouter : router}
