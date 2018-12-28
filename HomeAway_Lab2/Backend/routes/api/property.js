const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
var bodyParser = require('body-parser');
var app = express();
// Load Input Validation
var kafka = require('../../kafka/client');
const validateRegisterInput = require('../../validation/register');
// Load User model
const User = require('../../models/User');
const Property = require('../../models/Property');
const Booking = require('../../models/Booking');

// @route   POST api/createProperty
// @desc    edit create new property
// @access  Private
router.post(
    '/createProperty',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        //const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        //   if (!isValid) {
        //     // Return any errors with 400 status
        //     return res.status(400).json(errors);
        //   }
        console.log("Create Property ROUTE");
        // Get fields
        const newProperty = new Property({
            country: req.body.country,
            street: req.body.street,
            city: req.body.city,
            unit: req.body.unit,
            state: req.body.state,
            zipcode: req.body.zipcode,
            headline: req.body.headline,
            desc: req.body.desc,
            type: req.body.type,
            photos: req.body.photos,
            options: req.body.options,
            currency: req.body.currency,
            base: req.body.base,
            stay: req.body.stay,
            bedroom: req.body.bedroom,
            bathroom: req.body.bathroom,
            user: req.user.id
        });
        // Skills - Spilt into array
        console.log(newProperty);
        newProperty.save().then(property => res.json(property));
    }
);

router.post(
    '/addBooking',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        //const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        //   if (!isValid) {
        //     // Return any errors with 400 status
        //     return res.status(400).json(errors);
        //   }
        let propertyId = (req.body.id).split('/')[2].trim();
        console.log("Create Booking ROUTE");
        // Get fields
        const newBooking = new Booking({
            property : propertyId,
            toDate: req.body.toDate,
            fromDate: req.body.fromDate,
            user: req.user.id
        });
        // Skills - Spilt into array
        console.log(newBooking);
        newBooking.save().then(booking => res.json(booking));
    }
);

// @route   GET api/createProperty
// @desc    search properties
// @access  Private
router.post(
    '/search',
    (req, res) => {
        //const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        //   if (!isValid) {
        //     // Return any errors with 400 status
        //     return res.status(400).json(errors);
        //   }
        // let searchCity = (req.body.city).split(',')[0].trim();
        // console.log(searchCity);
        // Property.find({ city: searchCity }).then(property => {

        //     // Check for user
        //     if (!property) {
        //         //errors.email = 'User not found';
        //         return res.status(404).json("Properties Not found");
        //     }
        //     console.log(property);
        //     return res.status(200).json(property);
        // });
        kafka.make_request('search', req.body, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
              console.log("Inside err");
              res.status(404).json("Properties Not found");
            } else {
              console.log("Inside else");
              res.status(200).json(results)
        
              res.end();
            }
        
          });
    }
);
router.post(
    '/getPropertyDetails',
    (req, res) => {
        //const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        //   if (!isValid) {
        //     // Return any errors with 400 status
        //     return res.status(400).json(errors);
        //   }
        let id = (req.body.id).split('/')[2].trim();
        console.log(id);
        Property.findOne({ _id: id }).then(property => {

            // Check for user
            if (!property) {
                //errors.email = 'User not found';
                return res.status(404).json("Property Not found");
            }
            console.log(property);
            return res.status(200).json(property);
        });
    }
);
module.exports = router;