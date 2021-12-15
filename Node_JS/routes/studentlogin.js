const express = require("express");
const bcrypt = require("bcrypt");
const studlogin = express.Router();
const session = require("express-session");
const con = require("../db/db");

studlogin.get("/studentlogin", (req, res) => {
  res.render("studentlogin");
});

studlogin.post("/studentlogin", async (req, res) => {
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
    const User_ID = req.body.userid;
    const PWD = req.body.pwd;

    if (User_ID == 0 && PWD == 0) {
      err_msg = "Please enter the values";
      return res.render("studentlogin", { err_msg });
    }

    var check = `SELECT * FROM school_addstudent WHERE Stud_ID='${User_ID}'`;
    con.query(check, (err, result) => {
      if (err) {
        throw err;
      } else if (result.length == 1) {
        const pwd = result[0].Password;
        const matchPass = bcrypt.compareSync(PWD, pwd);

        if (matchPass) {
          let session = req.session;
          session.pass = result[0].Password;
          session.studid = result[0].Stud_ID;
          var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name FROM school_addstudent WHERE Stud_ID = '${User_ID}' AND Password = '${pwd}'`;
          con.query(sql, function (err, result) {
            if (err) {
              throw err;
            } else if (result.length == 1) {
              Roll_no = result[0].Stud_ID;
              name = result[0].Full_Name;
              Father_name = result[0].Father_name;
              Mother_name = result[0].Mother_name;
              DOB = result[0].DOB;
              emergency_no = result[0].Emergency_Contact_No;
              aadhar = result[0].Stud_Aadhar_No;
              mailid = result[0].Email_id;
              success = "Login Successfull";
              return res.render("studinfo", {
                success,
                Roll_no,
                name,
                Father_name,
                Mother_name,
                DOB,
                emergency_no,
                aadhar,
                mailid,
              });
            } else {
              err_msg = "Login Failed";
              return res.render("studentlogin", { err_msg });
            }
          });
        } else if (!matchPass) {
          err_msg = "Incorrect Password";
          return res.render("studentlogin", { err_msg });
        }
      } else {
        err_msg = "User Not Found";
        return res.render("studentlogin", { err_msg });
      }
    });
  } catch (e) {
    console.log(e);
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
      var sql = `SELECT * FROM school_addstudent WHERE Stud_ID='${session.studid}'`;
      con.query(sql, function (err, result) {
        if (err) {
          throw err;
        } else if (result.length == 1) {
          const pwd = result[0].Password;
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
              var change = `UPDATE school_addstudent SET Password = '${hashedpassword}' WHERE Stud_ID='${session.studid}'`;
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
    console.log(err);
  }
});

module.exports = studlogin;
