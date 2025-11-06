const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')

const register = asyncHandler(async (req, res) => {
    const {fistname, lastname, email, mobile, password} =req.body
    if(!fistname || !lastname || !email || !mobile || !password){
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        });
    }
    const user = await User.findOne({email})
    if(user) {
        throw new Error('User has existed!')
    }else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ?  "Register is succesfully. Please go login!" : "Something went wrong!",
            user: newUser,
        });
    }
    
})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs!"
        })
    }
    const response = await User.findOne({email})
    if(response && await response.isCorrectPassword(password) === true) {
        const {password, role, ...userData} = response.toObject()
        const accesToken = generateAccessToken(response._id, role)
        const refreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, {refreshToken}, {new: true})
        res.cookie('refreshToken', refreshToken, {htppOnly: true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accesToken,
            userData,
        })
    }else {
        throw new Error('Invalid credentials!')
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id} = req.user
    const user = await User.findById(_id).select('-refreshToken -password')
    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : 'User not found'
    })
    
    
})


module.exports = {
    register,
    login,
    getCurrent
}