const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
var bodyParser = require('body-parser');
var app = express();
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
// Load User model
const User = require('../../models/User');

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("Get Profile ROUTE");
    // const { errors, isValid } = validateLoginInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    // Find user by email
    console.log(req.user.email);
    User.findOne({ email: req.user.email }).then(user => {
        // Check for user
        if (!user) {
            //errors.email = 'User not found';
            return res.status(400).json("User Not found");
        }
        else
            return res.status(200).json(user);
    });
});

// @route   POST api/profile
// @desc    edit user profile
// @access  Private
router.post(
    '/updateUser',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        //const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        //   if (!isValid) {
        //     // Return any errors with 400 status
        //     return res.status(400).json(errors);
        //   }
        console.log("Update Profile ROUTE");
        // Get fields
        const profileFields = {};
        profileFields.email = req.user.email;
        if (req.body.firstName) profileFields.firstName = req.body.firstName;
        if (req.body.lastName) profileFields.lastName = req.body.lastName;
        if (req.body.about) profileFields.about = req.body.about;
        if (req.body.address) profileFields.address = req.body.address;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.school) profileFields.school = req.body.school;
        if (req.body.hometown) profileFields.hometown = req.body.hometown;
        if (req.body.languages) profileFields.languages = req.body.languages;
        if (req.body.gender) profileFields.gender = req.body.gender;
        if (req.body.phone) profileFields.phone = req.body.phone;
        // Skills - Spilt into array
        console.log(profileFields);
        User.findOne({ email: req.user.email }).then(profile => {
            if (profile) {
                // Update
                User.findOneAndUpdate(
                    { email: req.user.email },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));
            } else {
                res.status(400).json("Profie does not exist error");
            }
        });
    }
);

module.exports = router;