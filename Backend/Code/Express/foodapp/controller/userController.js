const userModel = require('../models/userModels');






module.exports.getUser = async function getUser(req, res) {
    let id = req.id;
    let user = await userModel.findById(id);
    // console.log(req);
    try {
        if (user) {
            return res.json(user);
        } else {
            res.json({
                message: "User not found. Could not retrieve details."
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}


module.exports.updateUser = async function updateUser(req, res) {

    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;

        if (user) {
            const keys = []
            for (let key in dataToBeUpdated) {
                keys.push(key)
            }

            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }

            console.log(user);
            user.confirmPassword = user.password;
            const updatedData = await user.save(); //save data in the document
            console.log(updatedData)
            res.json({
                message: "Data updated successfully.",
                data: user
            })
        }
        else {
            res.json({
                message: "User not found. Could not update details."
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
                message: "Data has been deleted",
                data: user
            })
        } else {
            res.json({
                message: "User not found. Could not delete user."
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.getAllUsers = async function getAllUsers(req, res) {
    try {
        let users = await userModel.find();

        if (users) {
            res.json({
                message: "Users retrieved",
                data: users
            })
        }else{
            res.json({
                message: "Users not found. Could not retrieve list of all users."
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.uploadProfileImage = async function uploadProfileImage(req,res){
    res.json("Profile image uploaded successfully.")
}