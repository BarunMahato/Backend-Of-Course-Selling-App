const {Router} = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET  = process.env.JWT_SECRET;
const adminRouter = Router();
const {adminModel} = require('../db');

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

adminRouter.post("/signup", function(req, res){
    res.json({
        message: "You are signed up."
    })
})

adminRouter.post("/signin", function(req, res){
    res.json({
        message: "You are signed in"
    })
})

adminRouter.post("/course", function(req, res){
    res.json({
        message: "Course Creation"
    })
})

adminRouter.put("/course", function(req, res){
    res.json({
        message: "Course was put into it."
    })
})

adminRouter.get("/course/bulk", function(req, res){
    res.json({
        message: "All course on bulk"
    })
})

module.exports = {
    adminRouter
}