const bcrypt = require('bcryptjs');
const passport = require('passport');
const Property = require('../models/Property');

function handle_request(msg, callback) {
   
    let searchCity = (msg.city).split(',')[0].trim();
        console.log(searchCity);
        Property.find({ city: searchCity }).then(property => {

            // Check for user
            if (!property) {
                //errors.email = 'User not found';
                callback(null, "Property Not Found");
            }
            console.log(property);
            callback(null, property);
        });
    console.log("seardh kafka end");
}

exports.handle_request = handle_request;