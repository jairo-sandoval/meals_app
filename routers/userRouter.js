const express = require('express')
const { protectSession, protectUserAccount } = require('../middlewares/authMiddleware')
const { getAllUsers, createUser, login, updateUser, deleteUser, getOrders, getOrderById } = require('../controllers/userController')
const { userExists } = require('../middlewares/userMiddlewares')
const router = express.Router()

//este endpoint lo hize para no perderme
router.get('/', getAllUsers)

router.post('/singup', createUser)

router.post('/login', login)

router.use(protectSession)

router.use('/:id', userExists, protectUserAccount)
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

router.get('/orders', getOrders)

router.get('/orders/:id', getOrderById)

module.exports = { userRouter : router}