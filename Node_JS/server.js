const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bcrypt = require('bcryptjs')
const { hashSync, compareSync } = require('bcryptjs')

const port = 5000;

const con = require('./db/db');


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(expressLayouts);
app.set('layout', './layouts/layout');

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))


app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('home');
})

app.post('/', async (req, res) => {

})








//STUDENT LOGIN

app.get('/studentlogin', (req, res) => {
  res.render('studentlogin')
})


app.post('/studentlogin', async (req, res) => {
  let err_msg = "";
  let success = "";
  let Roll_no = "";
  let name = "";
  let Father_name = "";
  let Mother_name = "";
  let DOB = "";
  let emergency_no = "";
  let aadhar = "";
  let mailid = "";
  try {
    const User_ID = req.body.userid
    const PWD = req.body.pwd

    var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name FROM school_addstudent WHERE Stud_ID = '${User_ID}' AND Class = '${PWD}'`;
    con.query(sql, function (err, result) {
      if (err) {
        throw err
      } else if (result.length == 1) {
        Roll_no = result[0].Stud_ID //array that contain json [{name: value, age: }] [a, b] = 0
        name = result[0].Full_Name
        Father_name = result[0].Father_name
        Mother_name = result[0].Mother_name
        DOB = result[0].DOB
        emergency_no = result[0].Emergency_Contact_No
        aadhar = result[0].Stud_Aadhar_No
        mailid = result[0].Email_id
        success = "Login Successfull";
        return res.render('studinfo', { success, Roll_no, name, Father_name, Mother_name, DOB, emergency_no, aadhar, mailid });

      } else {
        err_msg = "Login Failed";
        return res.render('studentlogin', { err_msg });
      }


    });


  } catch (e) {
    console.log(e)
  }

})

//STAFF LOGIN
app.get('/stafflogin', (req, res) => {
  res.render('stafflogin')
})

app.post('/stafflogin', (req, res) => {
  let err_msg = "";
  let success = "";
  let name = "";
  let staff_id = "";
  let dob = "";
  let martial_status = "";
  let joining_date = "";
  let qualification = "";
  let staff_type = "";
  let acc_no = "";
  let bloodgrp = "";
  let emailid = "";
  let phone_no = "";
  let pre_institute_name = "";
  let password = "";


  try {
    const User_ID = req.body.userid
    const PWD = req.body.pwd
    const PWD1 = bcrypt.hashSync(PWD, 12)




    var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstaff where Staff_id='${User_ID}' AND Password='${PWD1}'`
    con.query(sql, function (err, result) {
      if (err) {
        throw err
      } else if (result.length == 1) {
        name = result[0].Full_Name
        staff_id = result[0].Staff_id
        dob = result[0].DOB
        martial_status = result[0].Martial_Status
        joining_date = result[0].Joining_Date
        qualification = result[0].Qualification
        staff_type = result[0].Staff_type
        acc_no = result[0].Staff_Account_No
        bloodgrp = result[0].Blood_Group
        emailid = result[0].Email_ID
        phone_no = result[0].Phone_Number
        pre_institute_name = result[0].Pre_Institute_Name
        password = result[0].Password
        success = "Login Successfull";
        return res.render('staffinfo', {
          success, name, staff_id, dob, martial_status, joining_date,
          qualification, staff_type, acc_no, bloodgrp, emailid, phone_no, pre_institute_name, password
        })
      }
      else {
        err_msg = "Login Failed";
        return res.render('stafflogin', { err_msg });
      }
    })
  } catch (e) {
    console.log(e)
  }
})



//ADDING STUDENT

app.get('/addstudent', (req, res) => {
  res.render('addstudent');
})


app.post('/addstudent', async (req, res) => {

  try {

    const Stud_ID = req.body.studid
    const Class = req.body.class
    const First_Name = req.body.fname
    const Middle_Name = req.body.mname
    const Last_Name = req.body.lname
    const Father_name = req.body.father_name
    const Mother_name = req.body.mother_name
    const DOB = req.body.dob
    const Weight = req.body.weight
    const Height = req.body.height
    const Emergency_Contact_No = req.body.ecn
    const Religion = req.body.religion
    const Caste = req.body.caste
    const Mother_Tongue = req.body.mtongue
    const Stud_Aadhar_No = req.body.ano
    const Sex = req.body.sex
    const Email_id = req.body.Email


    var sql = `INSERT INTO school_addstudent(Stud_ID, Class, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, DOB, Weight, Height, Emergency_Contact_No, Religion, Caste, Mother_Tongue, Stud_Aadhar_No, Sex, Email_id) VALUES ('${Stud_ID}','${Class}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Weight}', '${Height}', '${Emergency_Contact_No}', '${Religion}', '${Caste}', '${Mother_Tongue}', '${Stud_Aadhar_No}', '${Sex}', '${Email_id}');`;
    con.query(sql, function (err) {
      if (err) throw err

      console.log('record inserted');
      return res.redirect('/addstudent');
    });
  } catch (e) {
    console.log(e);
  }
});







//ADDING STAFF

app.get('/addstaff', (req, res) => {
  res.render('addstaff');
})

app.post('/addstaff', async (req, res) => {

  try {

    const Staff_id = req.body.staffid
    const First_Name = req.body.fname
    const Middle_Name = req.body.mname
    const Last_Name = req.body.lname
    const Father_name = req.body.father_name
    const Mother_name = req.body.mother_name
    const DOB = req.body.dob
    const Sex = req.body.sex
    const Martial_Status = req.body.Martial_Status
    const Joining_Date = req.body.jdate
    const Qualification = req.body.qualification
    const Staff_type = req.body.staff_type
    const Staff_Account_No = req.body.saccno
    const Blood_Group = req.body.bgroup
    const Email_id = req.body.email
    const Phone_Number = req.body.phno
    const Emergency_Contact_No = req.body.ecn
    const Basic_Pay = req.body.bpay
    const Pre_Institute_Name = req.body.piname
    const Password = req.body.pwd
    var hashedpassword = bcrypt.hashSync(Password, 12)


    var sql = `INSERT INTO school_addstaff(Staff_id, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, DOB, Sex, Martial_Status, Joining_Date, Qualification, Staff_type, Staff_Account_No, Blood_Group, Email_id, Phone_Number, Emergency_Contact_No, Basic_Pay, Pre_Institute_Name, Password) VALUES ('${Staff_id}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Sex}', '${Martial_Status}', '${Joining_Date}', '${Qualification}', '${Staff_type}', '${Staff_Account_No}', '${Blood_Group}', '${Email_id}', '${Phone_Number}', '${Emergency_Contact_No}', '${Basic_Pay}', '${Pre_Institute_Name}', '${hashedpassword}');`;
    con.query(sql, function (err) {
      if (err) throw err

      console.log('record inserted');
      return res.redirect('/addstaff');
    });
  } catch (e) {
    console.log(e);
  }
});












app.listen(port, () => console.info(`Listening on port ${port}`))

