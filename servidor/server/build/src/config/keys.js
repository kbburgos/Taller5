"use strict";
const myConnection = require('express-myconnection');
const mysql = require('mysql');
module.exports = {
    "conexion": myConnection(mysql, {
        host: "localhost",
        user: 'root',
        password: 'root',
        database: 'GoodReads',
        port: 3306
    }, 'single'),
    "database": {
        host: "localhost",
        user: 'root',
        password: 'root',
        database: 'goodReads',
        port: 3306
    }
};
