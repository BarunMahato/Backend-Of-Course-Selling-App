const {Router} = require('express');
const courseRouter = Router();
const {userMiddleware} = require('../middleware/userMiddleware');
const {courseModel, purchaseModel} = require('../db');

courseRouter.get("/purchase",userMiddleware,async function(req, res){
    const userId = req.userId;
    const courseId = req.body.courseId;
    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: "You have bought the course successfully."
    })
})

courseRouter.post("/preview",async function(req, res){
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})

module.exports = {
    courseRouter
}