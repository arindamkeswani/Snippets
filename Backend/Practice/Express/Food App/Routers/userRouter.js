const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

    
userRouter
    .route('/getCookies')
    .get(getCookies)
    
userRouter
    .route('/setCookies')
    .get(setCookies)

    userRouter
        .route('/:id')
        .get(getUserByID);


async function getUser(req,res){
    // res.send(users);

    //CRUD video
    let allUsers = await userModel.find();
    // let allUsers = await userModel.findOne({name:"Arindam"});
    res.json({message:"List of all users:", 
            data: allUsers});
}

function postUser(req,res){
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data received successfully",
        user: req.body
    })
}

async function updateUser(req,res){
    // console.log('req.body->',req.body);


    // //6
    // let dataToBeUpdated= req.body;
    // for(key in dataToBeUpdated){
    //     users[key] = dataToBeUpdated[key];
    // }
    // //6

    // //update data in users object
    // res.json({
    //     message:"data updated successfully"
    // })

    //CRUD video
    let dataToBeUpdated= req.body;
    let user = await userModel.findOneAndUpdate({email: "aaa@gmail.com"}, dataToBeUpdated)
    res.json({
        message:"data updated successfully"
    })
}

async function deleteUser(req,res){
    // users = {};
    // res.json({
    //     message: "Data has been deleted"
    // });

    let user = await userModel.findOneAndDelete({email:"testhook@gmail.com"});

    res.json({
        message:"data has been deleted",
        data:user
    })
}

function getUserByID(req,res){
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    for(let i=0; i<users.length; i++){
        if(users[i]['id'] == paramId){
            obj = users[i];
        }
    }

    res.json({
        message: "Request received",
        data:obj
    })
}


//////Cookies
function setCookies(req,res){
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.cookie('isLoggedIn', true, {maxAge:1000*60*60*24, secure:true, httpOnly:true});
    res.cookie('isPrimeMember', true);
    res.send('Cookies have been set');
}

function getCookies(req,res){
    let cookies = req.cookies;
    console.log(cookies);
    res.send("cookies received");
}

module.exports = userRouter;