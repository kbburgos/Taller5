var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "goodReads"
});

/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO calificacion (usuario, libro) VALUES ('Usuario 2', 'Libro 2')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
