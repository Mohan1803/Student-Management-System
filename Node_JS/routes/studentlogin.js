const express = require("express");
const bcrypt = require("bcrypt");
const studlogin = express.Router();

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
          err_msg = "Wrong Password";
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

module.exports = studlogin;
