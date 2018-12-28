const bcrypt = require('bcryptjs');
const User = require('../models/User');

function handle_request(msg, callback) {
    console.log('registration handle request called');
    User.findOne({ email: msg.email }).then(user => {
        if (user) {
            //   errors.email = 'Email already exists';
            //   console.log('Email already exists');
            callback(null, "Email already exists");
        } else {

            const newUser = new User({
                lastName: msg.lastname,
                firstName: msg.firstname,
                email: msg.email,
                password: msg.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => callback(null, user))
                        .catch(err => callback(null, "Error"));
                });
            });
        }
    });
    console.log("registration kafka end");
}

exports.handle_request = handle_request;