'use strict';
var mysql = require('mysql');
var crypt = require('./crypt');
var db = {};
// Creating a connection object for connecting to mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'homeawaydb'
});

//Connecting to database
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

db.createUser = function (user, successCallback, failureCallback) {
    var passwordHash;
    crypt.createHash(user.password, function (res) {
        passwordHash = res;

        connection.query("INSERT INTO users (`email`, `password`, `firstName`, `lastName`) VALUES ( " + mysql.escape(user.email) + " , " + mysql.escape(passwordHash) +  " , " + mysql.escape(user.firstName) +  " , " + mysql.escape(user.lastName) + " ); ",
            function (err, rows, fields, res) {
                if (err) {
                    console.log(err);
                    failureCallback(err);
                    return;
                }
                successCallback();
            });
    }, function (err) {
        console.log(err);
        failureCallback();
    });
};

db.findUser = function (user, successCallback, failureCallback) {
    var sqlQuery = "SELECT * FROM `users` WHERE `email` = '" + user.email + "';";
    connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
           failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows[0])
        } else {
            failureCallback('User not found.');
        }
    });
};

module.exports = db;