const {Router} = require('express');
const courseRouter = Router();
const {courseModel} = require('../db');

courseRouter.get("/purchase", function(req, res){
    res.json({
        message: "Courses on your purchase list."
    })
})

courseRouter.post("/preview", function(req, res){
    res.json({
        message : "Courses you have bought and on the preview endpoint"
    })
})

module.exports = {
    courseRouter
}