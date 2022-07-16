const { Meal } = require("../model/mealModel");
const { ErrorMessage } = require("../utils/ErrorMessage");
const { handleAsync } = require("../utils/handleAsync");

const mealExist = handleAsync(async(req, res, next) => {
    const { id } = req.params

    const mealFound = await Meal.findOne({where: {id, status: 'active'}})

    if(!mealFound){
        return next(new ErrorMessage('this meal does not exist', 404))
    }

    console.log(mealFound)

    req.meal = mealFound
    next()
})

module.exports = { mealExist }