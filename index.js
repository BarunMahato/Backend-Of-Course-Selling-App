const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {userRouter} = require('./routes/user');
const {courseRouter} = require('./routes/course');
const {adminRouter} = require('./routes/admin');
const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main(){
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, function(req, res){
        console.log("Listening on port " + PORT);
    });
}
main();