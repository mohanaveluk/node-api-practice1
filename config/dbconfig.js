const mysql = require('mysql2');

require('dotenv').config();

var pool = {};
if (process.env.NODE_ENV === 'production') {
    pool = mysql.createPool({
        host: process.env.APPLICATION_SERVER,
        user: process.env.APPLICATION_USER,
        password: process.env.APPLICATION_PASSWORD,
        database: process.env.APPLICATION_DATABASE,
        connectionLimit: 10,
        multipleStatements: true,
        waitForConnections: true
    });
}
else if(process.env.NODE_ENV === 'development') {
    pool = mysql.createPool({
        host: process.env.DEV_APPLICATION_SERVER,
        user: process.env.DEV_APPLICATION_USER,
        password: process.env.DEV_APPLICATION_PASSWORD,
        database: process.env.DEV_APPLICATION_DATABASE,
        connectionLimit: 10,
        multipleStatements: true,
        waitForConnections: true
    });
}
module.exports = pool.promise();

