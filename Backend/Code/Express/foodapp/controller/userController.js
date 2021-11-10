const userModel = require('../models/userModels');






module.exports.getUser = async function getUser(req, res) {
    // res.send(users);
    let allUsers = await userModel.find(); //list of all users
    // let user = await userModel.findOne({name:"Pepcoder2"}); //list of all users
    console.log(allUsers);
    res.json({
        message: "List of all users",
        data: allUsers
    })
}

module.exports.postUser =  function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "Data received successfully",
        user: req.body
    });
}

module.exports.updateUser = async function updateUser(req, res) {
    // console.log("req.body->", req.body);

    // let dataToBeUpdatedInOriginalObject = req.body;
    // for (key in dataToBeUpdatedInOriginalObject) {
    //     users[key] = dataToBeUpdatedInOriginalObject[key];
    // }

    // res.json({
    //     message: "Data updated successfully"
    // })

    let dataToBeUpdatedInOriginalObject = req.body;
    let user = await userModel.findOneAndUpdate({ email: "pepcoder@gmail.com" }, dataToBeUpdatedInOriginalObject);

    res.json({
        message: "Data updated successfully"
    })
}

module.exports.deleteUser = async function deleteUser(req, res) {
    let user = await userModel.findOneAndDelete({ email: "pepcoder@gmail.com" });
    res.json({
        message: "Data deleted successfully",
        data: user
    })
}

module.exports.getUserById = function getUserById(req, res) {
    let paramId = req.params.id;
    let obj = {}

    for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] == paramId) {
            obj = users[i];
        }
    }

    res.json({
        message: "Request received",
        data: obj
    })
}

//////////////// Cookies
// function setCookies(req, res) {
//     // res.setHeader('Set-Cookie', 'isLoggedIn=true');
//     res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true })
//     res.cookie('isPrimeMember', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true })
//     res.send("cookies have been sent");
// }

// function getCookies(req, res) {
//     let cookies = req.cookies.isPrimeMember;
//     console.log(cookies);
//     res.send("Cookies received");
// }

