const myConnection = require('express-myconnection');
const mysql = require('mysql');
const { urlDB } = require("./constantes");

export default {'conexion' : myConnection(mysql, {
   host: "http://localhost",
   user: '',
   password: '',
   database: '',
   port: 3306
}, 'single'),
  'database' : {
     host: "http://localhost",
     user: '',
     password: '',
     database: '',
     port: 3306
  }
};
