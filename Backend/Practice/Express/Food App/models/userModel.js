const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
db_link='mongodb+srv://admin:foodappadmin@cluster0.t8urz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log("DB Connected");
})
.catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    name:{
        type:String, 
        required: true
    },
    email: {
        type:String,
        required:true,
        unique: true,
        validate:function(){
            return emailValidator.validate(this.email)
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate: function(){
            return this.confirmPassword==this.password;
        }
    },
    role:{
        type:String,
        enum:['admin', 'user', 'restaurantOwner', 'deliveryBoy'],
        default: 'user'
    },
    profileImage:{
        type:String,
        default: 'img/users/default.jpeg '
    },
    resetToken:String
});


// userSchema.pre('save', function(){
//     console.log("Before saving in db", this);
// })

// userSchema.post('save', function(doc){
//     console.log("After saving in db", doc);
// })

userSchema.pre('save', function(){
    this.confirmPassword=undefined;//wont save in db now
})

// userSchema.pre('save', async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString =await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
//     console.log(hashedString);
// })
//model

//model name, shcema name

userSchema.methods.createResetToken = function(){
    //creating unique token using crypto
    const resetToken = crypto.randomBytes(32);
    console.log("Normal:", resetToken);
    resetToken = resetToken.toString("hex");
    console.log("Hex:", resetToken);

    //Set value in Schema
    this.resetToken = resetToken;
    return resetToken;

}

userSchema.methods.resetPasswordHandler = function(password, confirmPassword){
    this.password = passsword;
    this.confirmPassword = confirmPassword;

    //We do not want this value after new pwd is set
    this.resetToken = undefined;
}

const userModel = mongoose.model('userModel', userSchema);

// (async function createUser(){
//     let user={
//         name:'Arindam 2',
//         email:"aaaa@gmail.com",
//         password: "12345678",
//         confirmPassword:"12345678"
//     }

//     let data = await userModel.create(user);
//     console.log(data);
// })()

module.exports = userModel;