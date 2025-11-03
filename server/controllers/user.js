const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
    const {fistname, lastname, email, mobile, password} =req.body
    if(!fistname || !lastname || !email || !mobile || !password){
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        });
    }
    const response = await User.create(req.body)
    return res.status(200).json({
        success: true,
        mes: "Register successfully",
        user: response,
    });
    
})

module.exports = {
    register,
}