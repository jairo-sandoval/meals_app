const express = require('express')
const { getAllUserOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController')
const { protectSession } = require('../middlewares/authMiddleware')
const { orderExist, protectOrderAction } = require('../middlewares/orderMiddlewares')

const router = express.Router()

router.use(protectSession)

router.get('/me', getAllUserOrders)
 
router.post('/', createOrder)

router.use('/:id', orderExist, protectOrderAction)
    .route('/:id')
    .patch(updateOrder)
    .delete(deleteOrder)


module.exports = { orderRouter: router}