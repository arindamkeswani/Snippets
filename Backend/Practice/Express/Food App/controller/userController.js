const userModel = require('../models/userModel');

module.exports.getUser = async function getUser(req, res) {
    let id = req.id
    let user = await userModel.findById(id);
    
    try {
        if (user) {
            return res.json(user);
        }
        else {
            res.json({ message: "User not found. Cannot get details." });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

// module.exports.postUser = function postUser(req,res){
//     console.log(req.body);
//     users = req.body;
//     res.json({
//         message: "data received successfully",
//         user: req.body
//     })
// }

module.exports.updateUser = async function updateUser(req, res) {

    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        
        let dataToBeUpdated = req.body;
        
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            // console.log(user);
            user.confirmPassword=user.password;
            let updatedUser = await user.save(); //to save in the document
            res.json({
                message: "data updated successfully",
                data: user
            })
        }
        else {
            res.json({
                message: "User not found. Cannot update details."
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }

}

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (user) {
            res.json({
                message: "data has been deleted",
                data: user
            })
        }
        else{
            res.json({
                message: "User not found. Cannot delete user."
            })
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.getAllUsers = async function getAllUsers(req, res) {
    try{
    let users = await userModel.find();

    if(users){
        res.json({
            message:'Users retrieved.',
            data : users
        })
    }
    else{
        res.json({
            message:'No users available. Cannot retrive data.',
        })
    }
}
catch(err){
    res.json({
        message: err.message
    })
}
}


module.exports.updateProfileImage = function updateProfileImage(req,res){
    res.json({
        message: "File uploaded successfully."
    })
}

// //////Cookies
// function setCookies(req,res){
//     // res.setHeader('Set-Cookie', 'isLoggedIn=true');
//     res.cookie('isLoggedIn', true, {maxAge:1000*60*60*24, secure:true, httpOnly:true});
//     res.cookie('isPrimeMember', true);
//     res.send('Cookies have been set');
// }

// function getCookies(req,res){
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send("cookies received");
// }
