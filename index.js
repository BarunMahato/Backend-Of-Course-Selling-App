const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {userRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');
const {adminRouter} = require('./routes/admin')
const app = express();

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(3000, function(req, res){
        console.log("Listening on port 3000.")
    });
}
main();