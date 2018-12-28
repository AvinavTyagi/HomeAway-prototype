const port = process.env.PORT || 3001;
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

//Adding database storage
var mysql = require('mysql');
//Adding connection pool
var pool = require('./pool');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Route to handle Post Request Call
app.post('/login', function (req, res) {
    console.log("Inside Login Post Request");
    var username = req.body.username;
    var password = req.body.password;

    var sql = "SELECT *  FROM users WHERE email = " +
        mysql.escape(username) + " and password = " + mysql.escape(password);
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            console.log(err);
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err || Object.keys(result).length === 0) {
                    console.log('Wrong Credentials Entered');
                    res.writeHead(401, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Unsuccessful Login");
                } else {
                    //console.log("Query Result "+result[0]["firstName"] + result[0]["email"] );
                    res.cookie('cookie', result[0]["firstName"] + "," + result[0]["email"], { maxAge: 900000, httpOnly: false, path: '/' });
                    
                    req.session.user = result;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login");
                }
            });
        }
    });

});

//Route to handle Post Request Call
app.post('/ownerRegistration', function (req, res) {
    console.log("Inside Registration Post Request");
    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    var sql = "INSERT INTO users (`email`, `password`, `firstName`, `lastName`) VALUES (" + mysql.escape(email) + "," +
        mysql.escape(password) + "," + mysql.escape(firstName) + "," +
        mysql.escape(lastName) + ")";
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err) {
                    console.log('Wrong Credentials Entered');
                    res.writeHead(401, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Unsuccessful Login");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successful Login");
                }
            });
        }
    });

});


app.post('/loadProfile', function (req, res) {
    console.log("Inside loadProfile Post Request");
    var email = (req.body.email).split(",")[1];
    var sql = "SELECT *  FROM users WHERE email = " +
        mysql.escape(email);
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err || Object.keys(result).length === 0) {
                    res.writeHead(401, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Unsuccessful query");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    });

});
app.post('/updateUser', function (req, res) {
    var email = (req.body.email).split(",")[1];
    console.log("Inside updateUser Post Request");
    var sql = "UPDATE users SET firstName = " +
        mysql.escape(req.body.firstName) + " , " +
        "lastName = " + mysql.escape(req.body.lastName) + " , " +
        "about = " + mysql.escape(req.body.about) + " , " +
        "address = " + mysql.escape(req.body.address) + " , " +
        "company = " + mysql.escape(req.body.company) + " , " +
        "school = " + mysql.escape(req.body.school) + " , " +
        "hometown = " + mysql.escape(req.body.hometown) + " , " +
        "languages = " + mysql.escape(req.body.languages) + " , " +
        "gender = " + mysql.escape(req.body.gender) + " , " +
        "phone = " + mysql.escape(req.body.phone) + " WHERE " +
        "email = " + mysql.escape(email);
    //"email = " + mysql.escape(req.body.email);
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err || Object.keys(result).length === 0) {
                    res.writeHead(401, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Unsuccessful query");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    });

});

app.post('/search', function (req, res) {
    console.log('Inside search Post Route');
    let city = (req.body.place).split(',')[0].trim();
    var sql = "SELECT * FROM property where city = " + mysql.escape(city);

    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Execute Query");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
});
app.post('/loadProperty', function (req, res) {
    console.log('Inside Load Property Post Route');
    var sql = "SELECT * FROM property where id = " + mysql.escape(req.body.ID);
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Execute Query");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
});
app.post('/loadOwnerProperties', function (req, res) {
    console.log('Inside Load Owner Property Post Route');
    var email = (req.body.email).split(",")[1];
    var sql = "SELECT * FROM property where owner = " + mysql.escape(email);
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Execute Query");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
});
app.post('/loadUserBookings', function (req, res) {
    console.log('Inside Load User Bookings Post Route');
    var email = (req.body.email).split(",")[1];
    var sql = "SELECT * FROM booking where user = " + mysql.escape(email);
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Could Not Execute Query");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
});

app.post('/addProperty', function (req, res) {
    console.log('Inside Add Property Post Route');
    var email = (req.body.owner).split(",")[1];
    console.log('New property for ' + req.body.owner + ' to be pushed ');
    var sql = "INSERT INTO property VALUES ( " +
        mysql.escape(req.body.country) + " , " +
        mysql.escape(req.body.street) + " , " +
        mysql.escape(req.body.apartment) + " , " +
        mysql.escape(req.body.city) + " , " +
        mysql.escape(req.body.state) + " , " +
        mysql.escape(req.body.zipcode) + " , " +
        mysql.escape(req.body.headline) + " , " +
        mysql.escape(req.body.desc) + " , " +
        mysql.escape(req.body.type) + " , " +
        mysql.escape(req.body.bedroom) + " , " +
        mysql.escape(req.body.bathroom) + " , " +
        mysql.escape(req.body.options) + " , " +
        mysql.escape(req.body.photo) + " , " +
        mysql.escape(req.body.currency) + " , " +
        mysql.escape(req.body.base) + " , " +
        mysql.escape(req.body.stay) + " , " +
        mysql.escape(email) +
        " , null) ";
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    res.writeHead(401, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Error While Creating");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end('Created Successfully');
                }

            });
        }
    });

});
app.post('/addBooking', function (req, res) {
    console.log('Inside Add Booking Post Route');
    var email = (req.body.user).split(",")[1];
    console.log('New booking for ' + req.body.user + ' to be pushed ');
    var sql = "INSERT INTO booking VALUES ( " +
        mysql.escape(req.body.propertyID) + " , " +
        mysql.escape(req.body.owner) + " , " +
        mysql.escape(email) + " , " +
        mysql.escape(req.body.fromDate) + " , " +
        mysql.escape(req.body.toDate) +
        " , null) ";
    console.log(sql);
    pool.getConnection(function (err, con) {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    res.writeHead(401, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Error While Creating");
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end('Created Successfully');
                }

            });
        }
    });

});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {

        const newFilename = file.originalname;
        cb(null, newFilename);
    },
});
const upload = multer({ storage }).array('selectedFile', 10);

app.post('/photos', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.status(404).send("a error ocurred");
        }
        // console.log(req.body.selectedFile);
        console.log(res.status);
    })
    console.log(res.status);
    console.log(req.files);
    console.log(req.body.selectedFile);
});

app.post('/download/:file(*)', (req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads', file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(base64img);
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");


