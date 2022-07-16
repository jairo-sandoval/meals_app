const { Restaurant } = require("../model/restaurantsModel");
const { ErrorMessage } = require("../utils/ErrorMessage");
const { handleAsync } = require("../utils/handleAsync");

const restaurantExist = handleAsync(async(req, res, next) => {
    const { id } = req.params

    const restaurant = await Restaurant.findOne({where: {id }})

    if(!restaurant){
        return next(new ErrorMessage('restaurant not found', 404))
    }   

    req.restaurant = restaurant
    next()
})

module.exports = {restaurantExist}