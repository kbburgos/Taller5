"use strict";
let myConnection = require('express-myconnection');
let mysql = require('mysql');
module.exports = {
    "conexion": myConnection(mysql, {
        host: "localhost",
        user: 'libro',
        password: 'libro',
        database: 'GoodReads',
        port: 3306
    }, 'single'),
    "database": {
        host: "localhost",
        user: 'libro',
        password: 'libro',
        database: 'goodReads',
        port: 3306
    }
};
