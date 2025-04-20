const { Router } = require('express');
const bcrypt = require('bcrypt');
const {z} = require('zod');
const {userModel, purchaseModel} = require('../db');

require('dotenv').config();

const jwt = require('jsonwebtoken');
const { userMiddleware } = require('../middleware/userMiddleware');
const JWT_SECRET  = process.env.JWT_USER_SECRET;

const userRouter = Router();

userRouter.post("/signup",async function(req, res){
    const requiredBody = z.object({
        firstName : z.string().min(3, {message: "First Name must be of length of 3."}).max(20, {message : "Cannot exceed more that 20 characters."}),
        lastName : z.string().min(3, {message: "Last Name must be of length of 3."}).max(20, {message : "Cannot exceed more that 20 characters."}),
        email : z.string().min(3 , {message: "Email must be of length of 3."}).max(100, {message: "Cannot exceed more that 100 characters."}).email({message: "Invalid email address."}),
        password: z.string()
        .min(8, { message: "Password should have minimum length of 8" })
        .max(15, "Password is too long")
        .regex(/^(?=.*[A-Z]).{8,}$/, {
          message:
            "Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
        })
    })
    const parseDataWithSuccess = requiredBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        return res.json({
            message : "Incorrect format of the input",
            error: parseDataWithSuccess.error,
        })
    }

    const {firstName, lastName, email, password} = parseDataWithSuccess.data;

    try{
        const hashedPassword = await bcrypt.hash(password, 5);
        await userModel.create({
            firstName,
            lastName,
            email,
            password : hashedPassword
        })
        return res.json({
            message: "You are signed up."
        })
    }catch(e){
        return res.json({
            message: "Duplicate Entries."
        })
    }
})

userRouter.post("/signin", async function(req, res){
    const email = req.body.email;  
    const password = req.body.password;
    const foundUser = await userModel.findOne({
        email,
    })
    if(!foundUser){
        return res.json({
            message: "It seems like you mistyped the email. We suggest you to check it and reenter it again."
        });
    }
    const comparedPassword = bcrypt.compare(password, foundUser.password);
    if(comparedPassword){
        const token = jwt.sign({
            id : foundUser._id.toString(),
        }, JWT_SECRET);
        res.json({
            message: "We hereby request you to save this token for further access",
            token,
        })
    }else{
        res.status(403).json({
            message: "The password you entered did not match in our database.",
        })
    }
})


userRouter.get("/purchases",userMiddleware,async function(req, res){
    const userId = req.userId;
    const purchase = await purchaseModel.find({
        userId
    })
    res.json({
        message: "Your purchase list.",
        purchase
    })
})

module.exports = {
    userRouter
}