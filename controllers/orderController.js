const { Meal } = require("../model/mealModel");
const { Order } = require("../model/orderModel");
const { Restaurant } = require("../model/restaurantsModel");
const { User } = require("../model/userModel");
const { ErrorMessage } = require("../utils/ErrorMessage");
const { handleAsync } = require("../utils/handleAsync");

const getAllUserOrders = handleAsync(async(req, res, next) => {
    const { sessionUser } = req
    
    const order = await Order.findAll({
        include: [
            { 
                model: User, 
                where: { id: sessionUser.id}
            },
            { 
                model: Meal, 
                include: { model: Restaurant}
            },
        ],
        
    })


    res.status(200).json({
        status: 'success',
        order
    })
})

const createOrder = handleAsync(async(req, res, next) => {
    const { sessionUser } = req
    const { quantity, mealId } = req.body

    const meal = await Meal.findOne({where: {id: mealId}})

    if(!meal){
        return next(new ErrorMessage('this meal not found', 404))
    }

    const totalPrice = quantity * meal.price
    const newOrder = await Order.create({quantity, mealId, userId: sessionUser.id,  totalPrice })

    res.status(201).json({
        status: 'active',
        newOrder
    })
})

const updateOrder = handleAsync(async(req, res, next) => {
    const { order } = req

    await order.update({status: 'completed'})

    res.status(200).json({
        status: 'success'
    })
})

const deleteOrder = handleAsync(async(req, res, next) => {
    const { order } = req

    await order.update({status: 'cancelled'})

    res.status(200).json({
        status: 'success'
    })
})

module.exports = {
    getAllUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
}

