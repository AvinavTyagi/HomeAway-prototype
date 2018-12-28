var connection =  new require('./kafka/Connection');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('./config/keys');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const db = keys.mongoURI;
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
// Passport middleware
 // HAS TO BE BEFORE USING CONFIG/PASSPORT
const app = express();
var signin = require('./services/signin');
var registration = require('./services/registration');
var search = require('./services/listProperty');
// Passport Config
app.use(passport.initialize());
require('./config/passport')(passport);
//topics files
//var signin = require('./services/signin.js');


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('KAFKA - BACKEND server is running ');
    consumer.on('message', function (message) {
        console.log('KAFKA - BACKEND message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('KAFKA - BACKEND after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login",signin);
handleTopicRequest("register",registration);
handleTopicRequest("search",search);
