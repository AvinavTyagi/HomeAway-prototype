var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'homeawaydb'
})


module.exports = pool;