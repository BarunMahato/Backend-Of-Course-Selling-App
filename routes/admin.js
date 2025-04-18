const {Router} = require('express');
const adminRouter = Router();
const {adminModel} = require('../db');

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