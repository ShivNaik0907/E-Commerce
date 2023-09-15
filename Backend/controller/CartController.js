const ErrorHandler = require('../utils/errorHandler')

const CatchAsyncErrors = require('../middleware/ErrorAsyncHandler')

const CartItemSchema = require('../models/CartModel')

const fs = require('fs')

const mongoose=require('mongoose')

const User = require("../UserModel/UserSchema");


exports.AddCartItem=CatchAsyncErrors(async(req,res,next)=>{

    console.log("database mein daalne aaya hai cart item")

    // const cartDetail = req.body;

    // const newItem = await CartItemSchema.create(cartDetail)

    res.status(200).json({
        success:true,
       
    })

    res
})
