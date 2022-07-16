const express = require('express')
const { database } = require('./utils/database')

//routers
const { userRouter } = require('./routers/userRouter')
const { mealRouter } = require('./routers/mealsRouter')
const { restaurantRouter } = require('./routers/restaurantRouter')
const { orderRouter } = require('./routers/orderRouter')

const { Restaurant } = require('./model/restaurantsModel')
const { Meal } = require('./model/mealModel')

const app = express()

//relations 
Meal.belongsTo(Restaurant, {foreignKey: 'restaurantId'})
Restaurant.hasMany(Meal)

database.authenticate()
    .then(() => console.log('database authenticated'))
    .catch(err => console.log(err))

database.sync()
    .then(() => console.log('database synced'))
    .catch(err => console.log(err))

app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/restaurants', restaurantRouter)
app.use('/api/v1/meals', mealRouter)
app.use('/api/v1/order', orderRouter)

app.use('*', (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: '500',
        error: err.message,
    })
})

const PORT = 4000
app.listen(PORT)