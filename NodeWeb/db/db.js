const mysql = require('mysql')
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_management_system"
});


con.connect(function(err) {
  if (err){ 
    return console.log(err);
  }
   console.log("Database Connected Successfully!");
 
});

module.exports = con;