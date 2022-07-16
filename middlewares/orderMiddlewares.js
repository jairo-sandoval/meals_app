const { Order } = require("../model/orderModel");
const { User } = require("../model/userModel");
const { ErrorMessage } = require("../utils/ErrorMessage");
const { handleAsync } = require("../utils/handleAsync");

const orderExist = handleAsync(async (req, res, next) => {
    const { id } = req.params

    const orderFound = await Order.findOne({where: {id, status: 'active'}})
    if(!orderFound){
        return next(new ErrorMessage('order not found', 404))
    }

    req.order = orderFound
    next()
})

const protectOrderAction = handleAsync(async(req, res, next) => {
    const { id } = req.params
    const { sessionUser } = req

    const order = await Order.findOne({
        include: { model: User },
        where: { id }
    })

    if(order.user.id !== sessionUser.id){
        return next(new ErrorMessage('You dont make this action for this orders', 401))
    }

    next()
})  

module.exports = { orderExist, protectOrderAction}