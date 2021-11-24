const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bcrypt = require('bcrypt')


const port = 8080

const con = require('./db/db');


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(expressLayouts);
app.set('layout', './layouts/layout');




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

    var check = `SELECT * FROM school_addstudent WHERE Stud_ID='${User_ID}'`
    con.query(check, (err, result) => {
      if (err) { throw err }
      else if (result.length == 1) {
        const pwd = result[0].Password;
        const matchPass = bcrypt.compareSync(PWD, pwd);

        if (matchPass) {
          var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name FROM school_addstudent WHERE Stud_ID = '${User_ID}' AND Password = '${pwd}'`;
          con.query(sql, function (err, result) {
            if (err) {
              throw err
            } else if (result.length == 1) {
              Roll_no = result[0].Stud_ID
              name = result[0].Full_Name
              Father_name = result[0].Father_name
              Mother_name = result[0].Mother_name
              DOB = result[0].DOB
              emergency_no = result[0].Emergency_Contact_No
              aadhar = result[0].Stud_Aadhar_No
              mailid = result[0].Email_id
              success = "Login Successfull";
              return res.render('studinfo', { success, Roll_no, name, Father_name, Mother_name, DOB, emergency_no, aadhar, mailid });

            }
            else {
              err_msg = "Login Failed";
              return res.render('studentlogin', { err_msg });
            }
          })
        } else if (!matchPass) {
          err_msg = "Wrong Password";
          return res.render('studentlogin', { err_msg });
        }
      }
      else {
        err_msg = "User Not Found";
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
  let role = "";
  let dob = "";
  let martial_status = "";
  let joining_date = "";
  let qualification = "";
  let aadhar = "";
  let staff_type = "";
  let acc_no = "";
  let bloodgrp = "";
  let emailid = "";
  let phone_no = "";
  let pre_institute_name = "";



  try {
    const User_ID = req.body.userid
    const PWD = req.body.pwd
    const rol = req.body.role

    var check = `SELECT * FROM school_addstaff WHERE Staff_id='${User_ID}'`
    con.query(check, (err, result) => {
      if (err) { throw err }
      else if (result.length == 1) {
        const pwd = result[0].Password;
        const matchPass = bcrypt.compareSync(PWD, pwd);

        if (matchPass) {
          var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstaff where Staff_id='${User_ID}' AND Password='${pwd}' AND Role='${rol}'`
          con.query(sql, function (err, result) {
            if (err) {
              throw err
            } else if (result.length == 1) {
              name = result[0].Full_Name
              staff_id = result[0].Staff_id
              role = result[0].Role
              dob = result[0].DOB
              martial_status = result[0].Martial_Status
              joining_date = result[0].Joining_Date
              qualification = result[0].Qualification
              aadhar = result[0].Aadhar_No
              staff_type = result[0].Staff_type
              acc_no = result[0].Staff_Account_No
              bloodgrp = result[0].Blood_Group
              emailid = result[0].Email_ID
              phone_no = result[0].Phone_Number
              pre_institute_name = result[0].Pre_Institute_Name

              if (rol == 'admin') {
                success = "Login Successfull";
                return res.render('addstaff');
              }
              else {
                success = "Login Successfull";
                return res.render('staffinfo', {
                  success, name, staff_id, role, dob, martial_status, joining_date,
                  qualification, aadhar, staff_type, acc_no, bloodgrp, emailid, phone_no, pre_institute_name,
                })
              }
            }
            else {
              err_msg = "Incorrect Role";
              return res.render('stafflogin', { err_msg });
            }
          })
        } else if (!matchPass) {
          err_msg = "Wrong Password";
          return res.render('stafflogin', { err_msg });
        }
      } else {
        err_msg = "User Not Found";
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
  let err_msg = "";
  let success = "";

  try {

    const Stud_ID = req.body.studid
    const Class = req.body.class
    const First_Name = req.body.fname
    const Middle_Name = req.body.mname
    const Last_Name = req.body.lname || "NIL"
    const Father_name = req.body.father_name
    const Mother_name = req.body.mother_name
    const DOB = req.body.dob || "01-01-0001"
    const Weight = req.body.weight || "01"
    const Height = req.body.height || "01"
    const Emergency_Contact_No = req.body.ecn || "NIL"
    const Religion = req.body.religion
    const Caste = req.body.caste
    const Mother_Tongue = req.body.mtongue
    const Stud_Aadhar_No = req.body.ano
    const Sex = req.body.sex
    const Email_id = req.body.Email
    const Password = req.body.pwd

    var hashedpassword = bcrypt.hashSync(Password, 12)

    const mailformat = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (Stud_ID.length < 5) {
      err_msg = "STUDENT ID VALUE IS TOO SHORT"
      return res.render('addstudent', { err_msg });
    }

    else if (!Email_id.match(mailformat)) {
      err_msg = "INVALID MAIL ID";
      return res.render('addstudent', { err_msg })
    }

    if (Stud_ID == 0 || Class == 0 || First_Name == 0 || Middle_Name == 0 || Father_name == 0 || Mother_name == 0 || DOB == 0 || Weight == 0 || Height == 0 || Emergency_Contact_No == 0 || Religion == 0 || Caste == 0 || Mother_Tongue == 0 || Stud_Aadhar_No == 0 || Sex == 0 || Email_id == 0 || Password == 0) {
      err_msg = "Please fill all details"
      return res.render("addstudent", { err_msg })
    }

    else {

      var dupstud = `SELECT * FROM school_addstudent WHERE Stud_ID='${Stud_ID}' OR Stud_Aadhar_No='${Stud_Aadhar_No}'`
      con.query(dupstud, (err, result) => {
        if (err) throw err
        else if (result.length == 1) {
          const studid = result[0].Stud_ID
          const aadharno = result[0].Stud_Aadhar_No


          if (studid == Stud_ID) {
            err_msg = "STUDENT ID IS ALREADY TAKEN";
            return res.render('addstudent', { err_msg })
          }


          if (aadharno == Stud_Aadhar_No) {
            err_msg = "Duplicate Aadhar Number";
            return res.render('addstudent', { err_msg })
          }

        }





        else {


          var sql = `INSERT INTO school_addstudent(Stud_ID, Class, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, DOB, Weight, Height, Emergency_Contact_No, Religion, Caste, Mother_Tongue, Stud_Aadhar_No, Sex, Email_id, Password) VALUES ('${Stud_ID}','${Class}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Weight}', '${Height}', '${Emergency_Contact_No}', '${Religion}', '${Caste}', '${Mother_Tongue}', '${Stud_Aadhar_No}', '${Sex}', '${Email_id}', '${hashedpassword}');`;
          con.query(sql, function (err) {
            if (err) throw err

            console.log('Student Record Inserted');
            success = "Student Added Successfully";
            return res.render('addstudent', { success });
          });
        }

      })
    }
  }
  catch (e) {
    console.log(e);
  }
});







//ADDING STAFF

app.get('/addstaff', (req, res) => {
  res.render('addstaff');
})

app.post('/addstaff', async (req, res) => {
  let success = "";
  try {

    const Staff_id = req.body.staffid
    const Role = req.body.role
    const First_Name = req.body.fname
    const Middle_Name = req.body.mname
    const Last_Name = req.body.lname
    const Father_name = req.body.father_name
    const Mother_name = req.body.mother_name
    const DOB = req.body.dob
    const Sex = req.body.sex
    const Martial_Status = req.body.martial_status
    const Joining_Date = req.body.jdate
    const Qualification = req.body.qualification
    const Aadhar = req.body.aadhar
    const Staff_type = req.body.staff_type
    const Staff_Account_No = req.body.saccno
    const Blood_Group = req.body.bgroup
    const Email_id = req.body.email
    const Phone_Number = req.body.phno
    const Emergency_Contact_No = req.body.emcno
    const Basic_Pay = req.body.bpay
    const Pre_Institute_Name = req.body.piname
    const Password = req.body.pwd
    var hashedpassword = bcrypt.hashSync(Password, 12)


    var sql = `INSERT INTO school_addstaff(Staff_id, Role, First_Name, Middle_Name, Last_Name, Father_Name, Mother_name, DOB, Sex, Martial_Status, Joining_Date, Qualification, Aadhar_No, Staff_type, Staff_Account_No, Blood_Group, Email_ID, Phone_Number, Emergency_Contact_No, Basic_Pay, Pre_Institute_Name, Password) VALUES ('${Staff_id}', '${Role}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Sex}', '${Martial_Status}', '${Joining_Date}', '${Qualification}', '${Aadhar}', '${Staff_type}', '${Staff_Account_No}', '${Blood_Group}', '${Email_id}', '${Phone_Number}', '${Emergency_Contact_No}', '${Basic_Pay}', '${Pre_Institute_Name}', '${hashedpassword}')`;
    con.query(sql, function (err) {
      if (err) throw err

      console.log('Staff Record Inserted');
      success = "Staff Added Successffully";
      return res.render('addstaff', { success });
    });
  } catch (e) {
    console.log(e);
  }
});












app.listen(port, () => console.info(`Listening on port ${port}`))

