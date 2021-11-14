const mongoose = require('mongoose');
const emailValidator = require('email-validator');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
db_link = 'mongodb+srv://admin:foodappadmin@cluster0.t8urz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then(function (db) {
        console.log("Plan DB Connected");
    })
    .catch(function (err) {
        console.log(err);
    });

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, 'plan name should not exceed more than 20 characters']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Price not entered']
    },
    ratingsAverage: {
        type: Number
    },
    discount: {
        type: Number,
        validate: [function () {
            return this.discount < 100
        }, 'Discount should not exceed price.']
    }
});

const planModel = mongoose.model('planModel', planSchema);

// (async function createPlan() {
//     let planObj = {
//         name: "Superfood1",
//         duration: 30,
//         price: 1000,
//         ratingsAverage: 5,
//         discount: 20
//     }

//     // let data = await planModel.create(planObj);
//     // console.log(data);

//     const doc = new planModel(planObj);

//     await doc.save();
// })();
module.exports = planModel;