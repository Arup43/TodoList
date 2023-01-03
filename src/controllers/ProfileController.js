const profileModel = require("../models/ProfileModel");
var jwt = require('jsonwebtoken');

exports.RegisterUser = (req, res) => {
    let reqBody = req.body;
    profileModel.create(reqBody, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    });
}

exports.LoginUser = (req, res) => {
    let reqBody = req.body;
    let UserName = reqBody["UserName"];
    let Password = reqBody["Password"];
    profileModel.find({
        UserName: UserName,
        Password: Password
    }, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            if(data.length > 0){

                //create auth token
                let payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: data[0]
                }
                var token = jwt.sign(payload, 'key123');


                res.status(200).json({
                    status: "success",
                    token: token,
                    data: data
                });
            } else{
                res.status(400).json({
                    status: "unauthorized",
                    data: data
                });
            }
        }
    })
}

exports.UpdateProfile = (req, res) => {
    let UserName = req.headers['username'];
    let reqBody = req.body;

    profileModel.updateOne({UserName: UserName}, {
        $set: reqBody
    }, {upsert: true}, (err, data) => {
        if(err){
            res.status(400).json({
                status: "fail",
                data: err
            });
        } else{
            res.status(200).json({
                status: "success",
                data: data
            });
        }
    })
}