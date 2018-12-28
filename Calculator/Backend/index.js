//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var math = require('mathjs');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//Route to handle Post Request Call
app.post('/validate', function (req, res) {
    console.log("Inside Post Request");
    console.log("Req Body:", req.body.displayString);
    try {
        var result = math.eval(req.body.displayString)
        console.log(result);
        result = math.format(result, { precision: 14 })
        console.log(result);
        res.writeHead(200, {
                    'Content-Type': 'application/JSON'
                })
        res.end(JSON.stringify(result));
    } catch (e) {
        if (e instanceof SyntaxError) {
            res.end("Invalid Syntax");
        }
    }
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");