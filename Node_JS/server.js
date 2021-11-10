const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const port = 8080;

const con = require('./db/db');

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(expressLayouts);
app.set('layout', './layouts/layout');

app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))


app.set('view engine','ejs')
//app.get('/',(req,res)=>{
  //  res.render('login');  
//})



app.get('/', (req,res)=>{
  res.render('addstudent');
})


app.post('/', async (req,res) => {

  try{

   const Stud_ID=req.body.studid
   const Class=req.body.class
   const First_Name=req.body.fname
   const Middle_Name=req.body.mname
   const Last_Name=req.body.lname
   const Father_name=req.body.father_name
   const Mother_name=req.body.mother_name
   const DOB=req.body.dob
   const Weight=req.body.weight
   const Height=req.body.height
   const Emergency_Contact_No=req.body.ecn
   const Religion=req.body.religion
   const Caste=req.body.caste
   const Mother_Tongue=req.body.mtongue
   const Stud_Aadhar_No=req.body.ano
   const Sex=req.body.sex
   const Email_id=req.body.Email
  

   var sql = `INSERT INTO school_addstudent(id, Stud_ID,Class, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, DOB, Weight, Height, Emergency_Contact_No, Religion, Caste, Mother_Tongue, Stud_Aadhar_No, Sex, Email_id) VALUES (10, '${Stud_ID}','${Class}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Weight}', '${Height}', '${Emergency_Contact_No}', '${Religion}', '${Caste}', '${Mother_Tongue}', '${Stud_Aadhar_No}', '${Sex}', '${Email_id}');`;
   con.query(sql, function(err) {
    if(err) throw err
    
    console.log('record inserted');
    // res.send('Data added successfully!');
   return res.redirect('/');
  });
}catch(e){
  console.log(e);
}
});



  

      






app.listen(port, ()=> console.info(`Listening on port ${port}`))

