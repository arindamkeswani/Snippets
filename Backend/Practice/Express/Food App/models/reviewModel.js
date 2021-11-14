const mongoose = require('mongoose');
const emailValidator = require('email-validator');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
db_link = 'mongodb+srv://admin:foodappadmin@cluster0.t8urz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function (db) {
        console.log("Review DB Connected");
    })
    .catch(function (err) {
        console.log(err);
    });

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review is required"]
    },
    rating: {
        type: Number,
        min: 1,
        max=10,
        required: [true, "Rating is required."]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true, 'Only a registered user can give a review']
    },
    plan:{
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required:[true, 'Need to specifiy the plan']
    }
})

const reviewModel = mongoose.model('reviewModel', reviewSchema);

//populate selective data in user field
//populate all data in plan field
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:user,
        select: "name profileImage"  
    }).populate("plan");
    next();
})

module.exports= reviewModel;