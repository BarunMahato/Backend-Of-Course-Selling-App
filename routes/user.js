const { Router } = require('express');
const userRouter = Router();
const {userModel} = require('../db');

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