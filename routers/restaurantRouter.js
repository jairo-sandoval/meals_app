const express = require('express')
const { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantControllers')
const { protectSession } = require('../middlewares/authMiddleware')
const { restaurantExist } = require('../middlewares/restaurantMiddleware')
const { checkRoleUser } = require('../middlewares/userMiddlewares')

const router = express.Router()

router.get('/', getAllRestaurants)

router.get('/:id', restaurantExist, getRestaurantById)

router.use(protectSession)

router.post('/', createRestaurant)

router.use('/:id', checkRoleUser, restaurantExist)
    .route('/:id')
    .patch(updateRestaurant)
    .delete(deleteRestaurant)

//reviews
//router.post('/reviews/:restaurantId', createReview)

//router.patch('/reviews/:id', updateReview)

//router.delete('/reviews/:id', deleteReview)

module.exports = { restaurantRouter: router}