const { User } = require("../model/userModel");
const { ErrorMessage } = require("../utils/ErrorMessage");
const { handleAsync } = require("../utils/handleAsync");

const userExists = handleAsync( async (req, res, next ) => {
    const { id } = req.params

    const userFound = await User.findOne({where:{ id, status: 'active'}})

    if(!userFound){
        return next(new ErrorMessage('User not found', 404))
    }

    req.user = userFound
    next()
})

const checkRoleUser = handleAsync(async ( req, res, next ) => {
    const { sessionUser } = req

    if(sessionUser.role !== 'admin'){
        return next(new ErrorMessage('You dont the role for make this action', 401))
    }

    next()
})

module.exports = {userExists, checkRoleUser}

