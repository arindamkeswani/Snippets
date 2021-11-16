const mongoose = require('mongoose');
// const emailValidator = require('email-validator');
// const { privateDecrypt } = require('crypto');

db_link = "mongodb+srv://admin:hfBZ0Hc1fhpMkCrU@cluster0.srt8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then(function(db){
    console.log("Review database connected");
})
.catch(function(err){
    console.log(err);
})

const reviewSchema = new mongoose.Schema({
    review:{
        type: String,
        required: [true, "We expect a review from you!"]
    },
    rating:{
        type: Number,
        min:1,
        max:10,
        required: [true, "We expect a rating from you!"] 
    },
    createdAt:{
        type: Date,
        default: Date.now()  
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true, "Need user details for the review."]
    },
    plan:{
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required: [true, "Need to specify the plan for the review."]
    } 
})


//populate
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: "user",
        select: "name profileImage"
    }).populate("plan");

    next();
})

const reviewModel = mongoose.model('reviewModel', reviewSchema);


module.exports = reviewModel;