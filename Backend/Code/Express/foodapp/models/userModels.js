const mongoose = require('mongoose');
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

db_link = "mongodb+srv://admin:hfBZ0Hc1fhpMkCrU@cluster0.srt8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// hfBZ0Hc1fhpMkCrU
mongoose.connect(db_link)
.then(function(db){
    console.log("Database connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword == this.password;
        }
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'restaurantOwner', 'deliveryExec'],
        default: 'user'
    },
    profileImage:{
        type: String,
        default: 'img/users/default.jpg'
    },
    resetToken:String
});

userSchema.pre('save', function(){
    // console.log("Before saving in database", this);
    this.confirmPassword = undefined;
})

userSchema.methods.createResetToken = function(){
    //create a unique token
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log(resetToken);
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function(password, confirmedPassword){
    this.password = password;
    this.confirmPassword = confirmedPassword;

    //Remove the reset token
    this.resetToken = undefined;
}


const userModel = mongoose.model('userModel', userSchema);


module.exports = userModel;