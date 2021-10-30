const express = require('express');
const app = express();

const port = 8080;


app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))


app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('login');  
})


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
   console.log("Connected!");
 
});



app.listen(port, ()=> console.info(`Listening on port ${port}`))