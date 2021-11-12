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
 app.get('/',(req,res)=>{
 res.render('login');  
})


app.post('/', async (req,res) =>{
  try{
    const User_ID=req.body.userid
    const PWD=req.body.pwd

    if(User_ID=="mohan" && PWD==333){
      res.render('addstaff')
    }
    else{
      res.render('addstudent')
    }
  }catch(e){
    console.log(e)
  }

})

//ADDING STUDENT

app.get('/addstudent', (req,res)=>{
  res.render('addstudent');
})


app.post('/addstudent', async (req,res) => {

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
  

   var sql = `INSERT INTO school_addstudent(Stud_ID, Class, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, DOB, Weight, Height, Emergency_Contact_No, Religion, Caste, Mother_Tongue, Stud_Aadhar_No, Sex, Email_id) VALUES ('${Stud_ID}','${Class}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Weight}', '${Height}', '${Emergency_Contact_No}', '${Religion}', '${Caste}', '${Mother_Tongue}', '${Stud_Aadhar_No}', '${Sex}', '${Email_id}');`;
   con.query(sql, function(err) {
    if(err) throw err
    
    console.log('record inserted');
   return res.redirect('/addstudent');
  });
}catch(e){
  console.log(e);
}
});





//ADDING STAFF

app.get('/addstaff', (req,res)=>{
  res.render('addstaff');
})

app.post('/addstaff', async (req,res) => {

  try{

   const Staff_id=req.body.staffid
   const First_Name=req.body.fname
   const Middle_Name=req.body.mname
   const Last_Name=req.body.lname
   const Father_name=req.body.father_name
   const Mother_name=req.body.mother_name
   const DOB=req.body.dob
   const Sex=req.body.sex
   const Martial_Status=req.body.Martial_Status
   const Joining_Date=req.body.jdate
   const Qualification=req.body.qualification
   const Staff_type=req.body.staff_type
   const Staff_Account_No=req.body.saccno
   const Blood_Group=req.body.bgroup
   const Email_id=req.body.email
   const Phone_Number=req.body.phno
   const Emergency_Contact_No=req.body.ecn
   const Basic_Pay=req.body.bpay
   const Pre_Institute_Name=req.body.piname
   
  

   var sql = `INSERT INTO school_addstaff(Staff_id, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, DOB, Sex, Martial_Status, Joining_Date, Qualification, Staff_type, Staff_Account_No, Blood_Group, Email_id, Phone_Number, Emergency_Contact_No, Basic_Pay, Pre_Institute_Name) VALUES ('${Staff_id}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Sex}', '${Martial_Status}', '${Joining_Date}', '${Qualification}', '${Staff_type}', '${Staff_Account_No}', '${Blood_Group}', '${Email_id}', '${Phone_Number}', '${Emergency_Contact_No}', '${Basic_Pay}', '${Pre_Institute_Name}');`;
   con.query(sql, function(err) {
    if(err) throw err
    
    console.log('record inserted');
   return res.redirect('/addstaff');
  });
}catch(e){
  console.log(e);
}
});



  

      






app.listen(port, ()=> console.info(`Listening on port ${port}`))

