const express = require("express");
const bcrypt = require("bcrypt");
const studlogin = express.Router();
const session = require("express-session");
const con = require("../config/db");
const sendMail = require("../config/mail");

studlogin.get("/studentlogin", (req, res) => {
  res.render("studentlogin");
});

studlogin.post("/studentlogin", async (req, res) => {
  let error = "";
  let success = "";

  try {
    const User_ID = req.body.userid;
    const PWD = req.body.pwd;

    if (User_ID == 0 && PWD == 0) {
      err_msg = "Please enter the values";
      return res.render("studentlogin", { error });
    }

    var check = `SELECT * FROM school_initialaddstudent WHERE Stud_ID='${User_ID}'`;
    con.query(check, (err, result) => {
      if (err) {
        error = "Server Crashed";
        res.render("servererror", { error });
      } else if (result.length == 1) {
        const pwd = result[0].password;
        const matchPass = bcrypt.compareSync(PWD, pwd);

        if (matchPass) {
          let session = req.session;
          session.studentId = result[0].ID;
          session.pass = result[0].Password;
          session.studid = result[0].Stud_ID;
          session.loggedIn = true;

          // check in school_addstudent
          var studentProfile = `SELECT * FROM school_addstudent WHERE Stud_ID = '${session.studentId}'`;
          con.query(studentProfile, (err, result) => {
            if (err) {
              throw err;
            } else if (result.length == 1) {
              res.locals.result = result;
              return res.redirect("/student/studinfo");
            } else {
              return res.redirect("/student/studprofilecreation");
            }
          });
        } else if (!matchPass) {
          error = "Incorrect Password";
          return res.render("studentlogin", { error });
        }
      } else {
        error = "User Not Found";
        return res.render("studentlogin", { error });
      }
    });
  } catch (e) {
    error = "Server Crashed";
    res.render("servererror", { error });
  }
});

// showing student info here
studlogin.get("/studinfo", (req, res) => {
  let session = req.session;
  let success = req.flash("success");
  res.locals.success = success;
  let error = req.flash("error");
  res.locals.error = error;
  try {
    // run a query and display render
    var stuLoginInfor = `SELECT * FROM school_initialaddstudent WHERE ID='${session.studentId}'`;
    con.query(stuLoginInfor, (err, result) => {
      if (err) throw err;
      else if (result.length == 1) {
        res.locals.result = result;
        return res.render("studinfo");
      } else {
        // error
        req.flash("error", "Student not found");
        return res.redirect("/student/studentlogin");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

studlogin.get("/studprofilecreation", (req, res) => {
  try {
    let session = req.session;
    console.log(session.studentId);
    var stud = `Select * from school_initialaddstudent where id = '${session.studentId}' `;
    con.query(stud, (err, result) => {
      if (err) {
        throw err;
      } else if (result.length == 1) {
        res.locals.result = result;
        return res.render("studprofilecreation");
      } else {
        error = "User Not Found";
        res.render("studprofilecreation", { error });
      }
    });
  } catch (e) {
    error = "Server Crashed";
    res.render("servererror", { error });
  }
});

studlogin.post("/studprofilecreation", (req, res) => {
  let session = req.session;
  let success = req.flash("success");
  res.locals.success = success;
  let error = req.flash("error");
  res.locals.error = error;
  try {
    const First_Name = req.body.fname;
    const Middle_Name = req.body.mname;
    const Last_Name = req.body.lname;
    const Father_name = req.body.father_name;
    const Mother_name = req.body.mother_name;
    const DOB = req.body.dob || "01-01-0001";
    const Emergency_Contact_No = req.body.ecn || "NIL";
    const Religion = req.body.religion;
    const Caste = req.body.caste;
    const Mother_Tongue = req.body.mtongue;
    const Stud_Aadhar_No = req.body.ano;
    const Sex = req.body.sex;

    if (
      First_Name == 0 ||
      Middle_Name == 0 ||
      Father_name == 0 ||
      Mother_name == 0 ||
      DOB == 0 ||
      Emergency_Contact_No == 0 ||
      Religion == 0 ||
      Caste == 0 ||
      Mother_Tongue == 0 ||
      Stud_Aadhar_No == 0 ||
      Sex == 0
    ) {
      error = "Please fill all details";
      return res.render("studprofilecreation", { error });
    } else if (Emergency_Contact_No.length < 10) {
      error = "Invalid Phone Nummber";
      return res.render("studprofilecreation", { error });
    } else {
      // To Find Duplicate Entries in Adding Student Module
      var dupstud = `SELECT EXISTS (SELECT * FROM school_addstudent WHERE Stud_ID='${session.studentId}' OR Stud_Aadhar_No='${Stud_Aadhar_No}') AS count`;
      con.query(dupstud, (err, result) => {
        if (err) {
          console.log(err);
          // error = "Server Crashed";
          // res.render("servererror", { error });
        } else if (result[0].count == 1) {
          // redirect to studinfo here.
          return res.redirect("/student/studinfo");
          // err_msg = "Duplicate Entries Found";
          // return res.render("studprofilecreation", { err_msg });
        } else {
          console.log(session.studentId);
          console.log(session.studid);
          var sql = `INSERT INTO school_addstudent(Stud_ID, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, DOB, Emergency_Contact_No, Religion, Caste, Mother_Tongue, Stud_Aadhar_No, Sex) VALUES ('${session.studentId}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Emergency_Contact_No}', '${Religion}', '${Caste}', '${Mother_Tongue}', '${Stud_Aadhar_No}', '${Sex}');`;
          con.query(sql, function (err, inserted) {
            if (err) {
              error = "Server Crashed here";
              console.log(err);
              res.render("servererror", { error });
            } else {
              console.log(inserted);
              res.locals.result = inserted.insertId;
              console.log("Student Record Inserted");
              success = "Student Added Successfully";
              return res.render("studinfo", { success });
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//Changing Password For Students By Their Own

studlogin.get("/changepwd", (req, res) => {
  res.render("changepwd");
});

studlogin.post("/changepwd", (req, res) => {
  let error = "";
  let success = "";
  try {
    const pwd1 = req.body.pwd1;
    const pwd2 = req.body.pwd2;
    const pwd3 = req.body.pwd3;

    if (pwd1 == 0 || pwd2 == 0 || pwd3 == 0) {
      error = "Please Enter Some values";
      res.render("changepwd", { error });
    }

    let session = req.session;

    if (session.studid) {
      var sql = `SELECT * FROM school_initialaddstudent WHERE Stud_ID='${session.studid}'`;
      con.query(sql, function (err, result) {
        if (err) {
          error = "Server Crashed";
          res.render("servererror", { error });
        } else if (result.length == 1) {
          const pwd = result[0].password;
          const matchpass = bcrypt.compareSync(pwd1, pwd);
          const pwdformat =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,}$/;
          if (!pwd2.match(pwdformat)) {
            error =
              "Password Must have atleast 5 characters that include atleast 1 lowercase , 1 uppercase , 1 number & 1 special character in(!@#$%^&*)";
            res.render("changepwd", { error });
          } else if (pwd1 == pwd2) {
            error = "New Password & Old Password Shouldn't Be Same";
            res.render("changepwd", { error });
          } else if (matchpass) {
            if (pwd2 == pwd3) {
              var hashedpassword = bcrypt.hashSync(pwd2, 12);
              var change = `UPDATE school_initialaddstudent SET password = '${hashedpassword}' WHERE Stud_ID='${session.studid}'`;
              con.query(change, (err, result) => {
                if (err) {
                  throw err;
                } else {
                  success = "Password Changed Successfully";
                  res.render("changepwd", { success });
                }
              });
            } else {
              error = "New Password Doesn't match";
              res.render("changepwd", { error });
            }
          } else {
            error = "Incorrect Old Password";
            res.render("changepwd", { error });
          }
        }
      });
    }
  } catch (err) {
    error = "Server Crashed";
    res.render("servererror", { error });
  }
});

//Student Logout
studlogin.get("/studlogout", (req, res) => {
  try {
    let session = req.session;
    if (session.id) {
      req.session.destroy();
      res.clearCookie("account");
      console.log("logged out");
      return res.redirect("/student/studentlogin");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = studlogin;
