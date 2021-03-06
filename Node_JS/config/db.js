const mysql = require("mysql");
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
  multipleStatements: true,
  connectionLimit: 15,
  queueLimit: 30,
});

con.connect(function (err, connect) {
  if (err) {
    return console.log(err);
  }
  console.log("Database Connected Successfully!");
});

module.exports = con;
