const express = require('express')
const { getAllUserOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController')
const { protectSession } = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(protectSession)

router.get('/me', getAllUserOrders)
 
router.post('/', createOrder)

router.patch('/:id', updateOrder)

router.delete(':/id', deleteOrder)

module.exports = { orderRouter: router}