const express = require("express");
const bcrypt = require("bcrypt");
const addstud = express.Router();
const con = require("../config/db");
const sendMail = require("../config/mail");

addstud.get("/addstudent", (req, res) => {
  res.render("addstudent");
});

addstud.post("/addstudent", async (req, res) => {
  let error = "";
  let err_msg = "";
  let success = "";

  try {
    const Stud_ID = req.body.studid;
    const Class = req.body.class;
    const First_Name = req.body.fname;
    const Middle_Name = req.body.mname;
    const Last_Name = req.body.lname;
    const Father_name = req.body.father_name;
    const Mother_name = req.body.mother_name;
    const DOB = req.body.dob || "01-01-0001";
    const Weight = req.body.weight || "01";
    const Height = req.body.height || "01";
    const Emergency_Contact_No = req.body.ecn || "NIL";
    const Religion = req.body.religion;
    const Caste = req.body.caste;
    const Mother_Tongue = req.body.mtongue;
    const Stud_Aadhar_No = req.body.ano;
    const Sex = req.body.sex;
    const Email_id = req.body.Email;
    const Password = req.body.pwd;

    //calculating age for students
    var today = new Date();
    var bday = new Date(DOB);
    var age = today.getFullYear() - bday.getFullYear();
    var month = today.getMonth() - bday.getMonth();
    if (month < 0 || today.getDate() < bday.getDate()) {
      age--;
    }

    if (
      (Class == 1 && age < 5) ||
      (Class == 2 && age < 6) ||
      (Class == 3 && age < 7) ||
      (Class == 4 && age < 8) ||
      (Class == 5 && age < 9) ||
      (Class == 6 && age < 10) ||
      (Class == 7 && age < 11) ||
      (Class == 8 && age < 12) ||
      (Class == 9 && age < 13) ||
      (Class == 10 && age < 14) ||
      (Class == 11 && age < 15) ||
      (Class == 12 && age < 16)
    ) {
      err_msg =
        "Age for the class " + Class + " doesn't match with the age " + age;
      return res.render("addstudent", { err_msg });
    }

    var hashedpassword = bcrypt.hashSync(Password, 12);

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (Stud_ID.length < 5) {
      err_msg = "STUDENT ID VALUE IS TOO SHORT";
      return res.render("addstudent", { err_msg });
    } else if (!Email_id.match(mailformat)) {
      err_msg = "INVALID MAIL ID";
      return res.render("addstudent", { err_msg });
    } else if (Emergency_Contact_No.length < 10) {
      err_msg = "Invalid Phone Nummber";
      return res.render("addstudent", { err_msg });
    }

    if (
      Stud_ID == 0 ||
      Class == 0 ||
      First_Name == 0 ||
      Middle_Name == 0 ||
      Father_name == 0 ||
      Mother_name == 0 ||
      DOB == 0 ||
      Weight == 0 ||
      Height == 0 ||
      Emergency_Contact_No == 0 ||
      Religion == 0 ||
      Caste == 0 ||
      Mother_Tongue == 0 ||
      Stud_Aadhar_No == 0 ||
      Sex == 0 ||
      Email_id == 0 ||
      Password == 0
    ) {
      err_msg = "Please fill all details";
      return res.render("addstudent", { err_msg });
    } else {
      //To Find Duplicate Entries in Adding Student Module

      var dupstud = `SELECT EXISTS (SELECT * FROM school_addstudent WHERE Stud_ID='${Stud_ID}' OR Stud_Aadhar_No='${Stud_Aadhar_No}' OR Email_id='${Email_id}') as count`;
      con.query(dupstud, (err, result) => {
        if (err) {
          error = "Server Crashed";
          res.render("servererror", { error });
        } else if (result[0].count == 1) {
          err_msg = "Duplicate Entries Found";
          return res.render("addstudent", { err_msg });
        } else {
          var sql = `INSERT INTO school_addstudent(Stud_ID, Class, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, DOB, Weight, Height, Emergency_Contact_No, Religion, Caste, Mother_Tongue, Stud_Aadhar_No, Sex, Email_id, Password) VALUES ('${Stud_ID}','${Class}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Weight}', '${Height}', '${Emergency_Contact_No}', '${Religion}', '${Caste}', '${Mother_Tongue}', '${Stud_Aadhar_No}', '${Sex}', '${Email_id}', '${hashedpassword}');`;
          con.query(sql, function (err) {
            if (err) {
              error = "Server Crashed";
              console.log(err);
              res.render("servererror", { error });
            } else {
              const mail = sendMail({
                from: process.env.MAIL_USERNAME,
                to: Email_id,
                subject: "Your User ID and Password for your login purpose.",
                html: `<p>User ID: ${Stud_ID}
                          Password: ${Password}</p>`,
              });
              mail
                .then((result) => {
                  console.log("Mail has been sent");
                })
                .catch((err) => {
                  error = "Server Crashed";
                  return res.render("servererror", { error });
                });
              console.log("Student Record Inserted");
              success = "Student Added Successfully";
              return res.render("addstudent", { success });
            }
          });
        }
      });
    }
  } catch (e) {
    error = "Server Crashed";
    res.render("servererror", { error });
  }
});

module.exports = addstud;
