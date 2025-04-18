const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user  = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String
})

const course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const admin = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const purchase = new Schema({
    courseId : ObjectId,
    userId: ObjectId
})

const userModel = mongoose.model("user", user);
const courseModel = mongoose.model("course", course);
const adminModel = mongoose.model("admin", admin);
const purchaseModel = mongoose.model("purchases", purchase);

module.exports ={
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}