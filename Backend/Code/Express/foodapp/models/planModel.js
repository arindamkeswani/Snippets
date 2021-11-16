const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const { privateDecrypt } = require('crypto');

db_link = "mongodb+srv://admin:hfBZ0Hc1fhpMkCrU@cluster0.srt8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// hfBZ0Hc1fhpMkCrU
mongoose.connect(db_link)
.then(function(db){
    console.log("Plan database connected");
})
.catch(function(err){
    console.log(err);
})

const planSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true,
        maxLength: [20, "Plan name should not be more than 20 characters."]
    },

    duration:{
        type: Number,
        required: true
    },
    price:{
        type:Number,
        required: [true, "Price is necessary."]
    },

    ratingsAverage:{
        type: Number
    },

    discount:{
        type: Number,
        validate: [function(){
            return this.discount < 100, "Discount cannot be more than 100%."
        }]
    },
    noOfReviews:{
        type: Number,
        default: 0
    }

})

const planModel = mongoose.model('planModel', planSchema);

// (
//     async function createPlan(){
//         let planObj= {
//             name: "Super food",
//             duration: 30,
//             price: 100,
//             ratingsAverage: 6.7,
//             discount: 20
//         }

//         const doc = new planModel(planObj);

//         await doc.save();
//     }
// )();

module.exports = planModel;