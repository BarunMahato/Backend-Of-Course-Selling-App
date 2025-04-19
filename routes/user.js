const { Router } = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET  = process.env.JWT_SECRET;
const userRouter = Router();
const {userModel} = require('../db');

function auth( req, res, next){
    const token = req.headers.token;
    const response = jwt.verify(token, JWT_SECRET);
    if(response){
        req.userId = response.userId;
        next();
    }else{
        res.json({
            message: "Sorry your userId did not match"
        })
    }
}

userRouter.post("/signup", function(req, res){
    res.json({
        message: "You are signed up."
    })
})

userRouter.post("/signin", function(req, res){
    res.json({
        message: "You are signed in"
    })
})


userRouter.get("/purchases", function(req, res){
    res.json({
        message: "Your purchase list."
    })
})

module.exports = {
    userRouter
}