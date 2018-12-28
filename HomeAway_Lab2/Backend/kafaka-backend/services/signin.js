const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Load Input Validation
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');
// Load User model



function handle_request(msg, callback) {
    console.log('login handle request called');
    const email = msg.email;
    const password = msg.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        if (!user) {
            callback(null, "Not Found");
        }
        console.log("USER");
        console.log(user);
        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = { id: user.id, email: user.email, firstName: user.firstName }; // Create JWT Payload
                console.log(payload);
                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        // res.json({
                        //     success: true,
                        //     token: 'Bearer ' + token
                        // });
                        console.log(token);
                        callback(null, token);
                    }
                );
            } else {
                //errors.password = 'Password incorrect';
                // return res.status(400).json("Password incorrect");
                callback(null, "Password incorrect");
            }
        });
    });
    // var res = {};
    // console.log("KAFKA - BACKEND In handle request:" + JSON.stringify(msg));
    // mongo.connect(function (err, db) {
    //     if (err) {
    //         callback(null, "KAFKA - BACKEND Cannot connect to db");
    //     }
    //     else {
    //         console.log('KAFKA - BACKEND Connected to mongodb');
    //         var query = { Email: msg.username };
    //         var dbo = db.db('usersignup');
    //         dbo.collection("usersignup").find(query).toArray(function (err, result) {
    //             if (err) {
    //                 //throw err;
    //                 callback(err, "Error");
    //             }
    //             if (result.length > 0) {
    //                 var hash = result[0].Password;
    //                 bcrypt.compare(msg.password, hash, function (err, doesMatch) {
    //                     if (doesMatch) {
    //                         console.log("KAFKA - BACKEND Inside result.length", result[0].userID);

    //                         callback(null, result);
    //                     } else {
    //                         callback(null, []);
    //                     }
    //                 });
    //             }
    //             else {
    //                 callback(null, []);
    //             }
    //         });
    //     }
    // });

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
}

exports.handle_request = handle_request;