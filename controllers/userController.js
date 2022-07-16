const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const { handleAsync } = require('../utils/handleAsync')
const { User } = require('../model/userModel')
const { ErrorMessage } = require('../utils/ErrorMessage')

dotenv.config({path: './config.env'})

const getAllUsers = handleAsync(async(req, res, next) => {
    const users = await User.findAll()

    res.status(200).json({ 
        status: 'success',
        users 
    })
})

const createUser = handleAsync(async(req, res, next) => {
    const { name, email, password, role } = req.body
    console.log('es')

    const salt = await bcrypt.genSalt(12)
    const passwordHashed = await bcrypt.hash(password, salt)

    const newUser = await User.create({name, email, password: passwordHashed, role }) 
    newUser.password = undefined
    
    res.status(201).json({
        status: 'success',
        newUser
    })
})

const login = handleAsync(async(req, res, next) => {
    const {email, password } = req.body
    const user = await User.findOne({where: {email}})

    if(!user){
        return next(new ErrorMessage('email invalid', 401))
    }

    const passwordValid = await bcrypt.compare( password, user.password )

    if(!passwordValid){
        return next(new ErrorMessage('password invalid', 401))
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SING, {expiresIn: "1d"} )
    
    res.status(202).json({
        status: 'success',
        token
    })
})

const updateUser = handleAsync(async(req, res, next) => {
    const { user } = req
    const { name, email } = req.body

    user.update({name, email})

    res.status(200).json({
        status: 'success'
    })
})

const deleteUser = handleAsync(async(req, res, next) => {
    const { user } = req

    user.update({status: 'disabled'})

    res.status(200).json({
        status: 'success'
    })
})

const getOrders = handleAsync(async(req, res, next) => {
    
})

const getOrderById = handleAsync(async(req, res, next) => {
    
})

module.exports = {
    getAllUsers,
    createUser,
    login,
    updateUser,
    deleteUser,
    getOrders,
    getOrderById
}