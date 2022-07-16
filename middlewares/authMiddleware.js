const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

const { handleAsync } = require("../utils/handleAsync");
const { ErrorMessage } = require("../utils/ErrorMessage");
const { User } = require('../model/userModel');

dotenv.config({path: './config.env'})

const protectSession = handleAsync(async(req, res, next) => {
    const auth = req.headers.authorization
    let token;

    if(auth && auth.startsWith('Bearer')){
        token = auth.split(' ')[1]
    }

    if(!token){
        return next(new ErrorMessage('invalid token', 203))
    }

    const sessionUser = await jwt.verify(token, process.env.JWT_SING)

    const user = await User.findOne({where: {id: sessionUser.id, status: 'active'}})

    if(!user){
        return next(new ErrorMessage('the owner of this session does not exist'), 404)
    }

    req.sessionUser = user
    next()
})

const protectUserAccount = (req, res, next) => {
    const { user, sessionUser } = req

    if(user.id !== sessionUser.id ){
        return next('this session not corresponding with this user', 401)
    }

    next()
}

module.exports = { protectSession, protectUserAccount }