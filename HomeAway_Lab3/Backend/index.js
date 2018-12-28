const port = process.env.PORT || 3001;
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var cors = require('cors');
//import the require dependencies
var express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
//DB config
const db = require('./config/keys').mongoURI;
// var kafka = require('./kafka/client');
//connect to mongo
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(db, options)
    .then(() => console.log('mongo connected'))
    .catch(() => console.log(err));
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
// const Property = require('./models/Property');
const User = require('./models/User');
// Passport middleware
const app = express();
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// const users = require('./routes/api/users');
// const profile = require('./routes/api/profile');
// const property = require('./routes/api/property');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
//use routes
// app.use('/api/users', users);
// app.use('/api/profile', profile);
// app.use('/api/property', property);


var session = require('express-session');
var cookieParser = require('cookie-parser');

const bcrypt = require('bcryptjs');

const keys = require('./config/keys');
//Adding database storage
var mysql = require('mysql');
//Adding connection pool
var pool = require('./pool');



//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));



//Route to handle Post Request Call
app.post('/login', function (req, res) {
    console.log("Inside Login Post Request");
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user != null) {
            User.findOne(
                {
                    email: req.body.email,
                    usertype: req.body.usertype
                },
                function (err, user) {
                    if (err) {
                        value =
                            "Wrong Password";
                        console.log(err);
                        callback(null, value);
                    } else if (user && password) {
                        console.log("login successfull");
                        var ID = {
                            id: user._id
                        };
                        // var token = jwt.sign(ID, "273LABSubmit", {
                        //   expiresIn: 10800 // in seconds
                        // });
                        // console.log("Token:" + token);
                        // const userID = {
                        //   token,
                        //   email: user.email,
                        //   usertype: user.usertype
                        // };
                        res.cookie('cookie', result[0]["firstName"] + "," + result[0]["email"], { maxAge: 900000, httpOnly: false, path: '/' });

                        req.session.user = result;
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Successful Login");
                    } else {
                        value =
                            "Email already Exists";
                        console.log(value);
                        res.sendStatus(202).end();
                    }
                }
            );
        } else res.sendStatus(201).end();
    });
    // var sql = "SELECT *  FROM users WHERE email = " +
    //     mysql.escape(username) + " and password = " + mysql.escape(password);
    // console.log(sql);
    // pool.getConnection(function (err, con) {
    //     if (err) {
    //         console.log(err);
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Could Not Get Connection Object");
    //     } else {
    //         con.query(sql, function (err, result) {
    //             if (err || Object.keys(result).length === 0) {
    //                 console.log('Wrong Credentials Entered');
    //                 res.writeHead(401, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("Unsuccessful Login");
    //             } else {
    //                 //console.log("Query Result "+result[0]["firstName"] + result[0]["email"] );
    //                 res.cookie('cookie', result[0]["firstName"] + "," + result[0]["email"], { maxAge: 900000, httpOnly: false, path: '/' });

    //                 req.session.user = result;
    //                 res.writeHead(200, {
    //                     'Content-Type': 'text/plain'
    //                 })
    //                 res.end("Successful Login");
    //             }
    //         });
    //     }
    // });

});


// app.post('/loadOwnerProperties', function (req, res) {
//     console.log('Inside Load Owner Property Post Route');
//     var email = (req.body.email).split(",")[1];
//     var sql = "SELECT * FROM property where owner = " + mysql.escape(email);
//     console.log(sql);
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Could Not Execute Query");
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'application/json'
//                     })
//                     res.end(JSON.stringify(result));
//                 }
//             });
//         }
//     });
// });
// app.post('/loadUserBookings', passport.authenticate('jwt', { session: false }), function (req, res) {
//     console.log('Inside Load User Bookings Post Route');
//     // var email = (req.body.email).split(",")[1];
//     // var sql = "SELECT * FROM booking where user = " + mysql.escape(email);
//     // console.log(sql);
//     // pool.getConnection(function (err, con) {
//     //     if (err) {
//     //         res.writeHead(400, {
//     //             'Content-Type': 'text/plain'
//     //         })
//     //         res.end("Could Not Get Connection Object");
//     //     } else {
//     //         con.query(sql, function (err, result) {
//     //             if (err) {
//     //                 res.writeHead(400, {
//     //                     'Content-Type': 'text/plain'
//     //                 })
//     //                 res.end("Could Not Execute Query");
//     //             } else {
//     //                 res.writeHead(200, {
//     //                     'Content-Type': 'application/json'
//     //                 })
//     //                 res.end(JSON.stringify(result));
//     //             }
//     //         });
//     //     }
//     // });
//     // Get fields
//     const newBooking = new Booking({
//         user: req.user.id
//     });
//     Property.findOne({ user: req.user.id }).then(property => {

//         // Check for user
//         if (!property) {
//             //errors.email = 'User not found';
//             return res.status(404).json("Property Not found");
//         }
//         console.log(property);
//         return res.status(200).json(property);
//     });
// });

// app.post('/addProperty', function (req, res) {
//     console.log('Inside Add Property Post Route');
//     var email = (req.body.owner).split(",")[1];
//     console.log('New property for ' + req.body.owner + ' to be pushed ');
//     var sql = "INSERT INTO property VALUES ( " +
//         mysql.escape(req.body.country) + " , " +
//         mysql.escape(req.body.street) + " , " +
//         mysql.escape(req.body.apartment) + " , " +
//         mysql.escape(req.body.city) + " , " +
//         mysql.escape(req.body.state) + " , " +
//         mysql.escape(req.body.zipcode) + " , " +
//         mysql.escape(req.body.headline) + " , " +
//         mysql.escape(req.body.desc) + " , " +
//         mysql.escape(req.body.type) + " , " +
//         mysql.escape(req.body.bedroom) + " , " +
//         mysql.escape(req.body.bathroom) + " , " +
//         mysql.escape(req.body.options) + " , " +
//         mysql.escape(req.body.photo) + " , " +
//         mysql.escape(req.body.currency) + " , " +
//         mysql.escape(req.body.base) + " , " +
//         mysql.escape(req.body.stay) + " , " +
//         mysql.escape(email) +
//         " , null) ";
//     console.log(sql);
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     console.log(err);
//                     res.writeHead(401, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Error While Creating");
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end('Created Successfully');
//                 }

//             });
//         }
//     });

// });
// app.post('/addBooking', function (req, res) {
//     console.log('Inside Add Booking Post Route');
//     var email = (req.body.user).split(",")[1];
//     console.log('New booking for ' + req.body.user + ' to be pushed ');
//     var sql = "INSERT INTO booking VALUES ( " +
//         mysql.escape(req.body.propertyID) + " , " +
//         mysql.escape(req.body.owner) + " , " +
//         mysql.escape(email) + " , " +
//         mysql.escape(req.body.fromDate) + " , " +
//         mysql.escape(req.body.toDate) +
//         " , null) ";
//     console.log(sql);
//     pool.getConnection(function (err, con) {
//         if (err) {
//             res.writeHead(400, {
//                 'Content-Type': 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     console.log(err);
//                     res.writeHead(401, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Error While Creating");
//                 } else {
//                     res.writeHead(200, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end('Created Successfully');
//                 }

//             });
//         }
//     });

// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {

//         const newFilename = file.originalname;
//         cb(null, newFilename);
//     },
// });
// const upload = multer({ storage }).array('selectedFile', 10);

// app.post('/photos', function (req, res) {
//     upload(req, res, function (err) {
//         if (err) {
//             console.log(err);
//             return res.status(404).send("a error ocurred");
//         }
//         // console.log(req.body.selectedFile);
//         console.log(res.status);
//     })
//     console.log(res.status);
//     console.log(req.files);
//     console.log(req.body.selectedFile);
// });

// app.post('/download/:file(*)', (req, res) => {
//     console.log("Inside download file");
//     var file = req.params.file;
//     var fileLocation = path.join(__dirname + '/uploads', file);
//     var img = fs.readFileSync(fileLocation);
//     var base64img = new Buffer(img).toString('base64');
//     res.writeHead(200, { 'Content-Type': 'image/jpg' });
//     res.end(base64img);
// });

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");


