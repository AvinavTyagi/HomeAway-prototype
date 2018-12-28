const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
var bodyParser = require('body-parser');
var kafka = require('../../kafka/client');
var app = express();
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model
const User = require('../../models/User');

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  console.log("LOGIN ROUTE");

  kafka.make_request('login', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {
      console.log("Inside else");
      res.json({
        success: true,
        token: 'Bearer ' + results
      });

      res.end();
    }

  });
});

router.post('/register', function (req, res) {
  //     const { errors, isValid } = validateRegisterInput(req.body);
  //     console.log("register Post route ");
  //     console.log(req.body.lastname + req.body.firstname+ req.body.email + req.body.password);

  //     // Check Validation
  //     if (!isValid) {
  //       return res.status(400).json(errors);
  //     }

  //     User.findOne({ email: req.body.email }).then(user => {
  //       if (user) {
  //         errors.email = 'Email already exists';
  //         console.log('Email already exists');
  //         return res.status(400).json('Email already exists');
  //       } else {

  //         const newUser = new User({
  //           lastName: req.body.lastname,
  //           firstName: req.body.firstname,
  //           email: req.body.email,
  //           password: req.body.password
  //         });

  //         bcrypt.genSalt(10, (err, salt) => {
  //           bcrypt.hash(newUser.password, salt, (err, hash) => {
  //             if (err) throw err;
  //             newUser.password = hash;
  //             newUser
  //               .save()
  //               .then(user => res.json(user))
  //               .catch(err => console.log(err));
  //           });
  //         });
  //       }
  //     });
  //     console.log("route end");

  kafka.make_request('register', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else {
      console.log("Inside else");
      res.json(results);

      res.end();
    }

  });
});


// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {    
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;

