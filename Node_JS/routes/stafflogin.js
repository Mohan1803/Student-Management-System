const express = require("express");
const stafflogin = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const con = require("../db/db");

//STAFF LOGIN GET // display form
stafflogin.get("/stafflogin", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  return res.render("stafflogin");
});

// staff login POST
stafflogin.post("/stafflogin", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  let welcome = "";
  welcome = req.flash("welcome");
  res.locals.welcome = welcome;

  try {
    const User_ID = req.body.userid;
    const PWD = req.body.pwd;
    // const rol = req.body.role;
    if (User_ID.length == 0 && PWD.length == 0) {
      req.flash("error", "Enter The Details");
      return res.redirect("stafflogin");
    }
    var check = `SELECT * FROM school_addstaff WHERE Staff_id='${User_ID}'`;
    con.query(check, (err, result) => {
      if (err) {
        throw err;
      } else if (result.length == 1) {
        const pwd = result[0].Password;
        // const rol = result[0].Role;
        const matchPass = bcrypt.compareSync(PWD, pwd);

        if (matchPass) {
          let session = req.session;

          session.Staff_id = result[0].Staff_id;
          session.role = result[0].Role;

          session.logged_in = true;
          req.flash(
            "welcome",
            `Hi ${session.Staff_id}, How are you doing today?`
          );
          return res.status(200).redirect("staffinfo");
        } else {
          req.flash("error", "Incorrect Password.");
          return res.redirect("stafflogin");
        }
      } else {
        req.flash("error", "User Not Found");
        return res.redirect("stafflogin");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// get STAFF Dashboard
stafflogin.get("/staffinfo", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  let welcome = "";
  welcome = req.flash("welcome");
  res.locals.welcome = welcome;
  //   let name = "";
  //   let staff_id = "";
  //   let role = "";
  //   let dob = "";
  //   let martial_status = "";
  //   let joining_date = "";
  //   let qualification = "";
  //   let aadhar = "";
  //   let staff_type = "";
  //   let acc_no = "";
  //   let bloodgrp = "";
  //   let emailid = "";
  //   let phone_no = "";
  //   let pre_institute_name = "";
  try {
    let session = req.session;
    if (session.Staff_id) {
      var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstaff where Staff_id='${session.Staff_id}' AND Role='${session.role}'`;
      con.query(sql, function (err, result) {
        if (err) {
          throw err;
        } else if (result.length == 1) {
          // name = result[0].Full_Name;
          // staff_id = result[0].Staff_id;
          // role = result[0].Role;
          // dob = result[0].DOB;
          // martial_status = result[0].Martial_Status;
          // joining_date = result[0].Joining_Date;
          // qualification = result[0].Qualification;
          // aadhar = result[0].Aadhar_No;
          // staff_type = result[0].Staff_type;
          // acc_no = result[0].Staff_Account_No;
          // bloodgrp = result[0].Blood_Group;
          // emailid = result[0].Email_ID;
          // phone_no = result[0].Phone_Number;
          // pre_institute_name = result[0].Pre_Institute_Name;

          res.locals.result = result;
          req.flash("success", "Welcome Back..!");
          return res.render("staffinfo");
        } else {
          req.flash("error", "Authentication failed.");
          return res.redirect("stafflogin");
        }
      });
    } else {
      req.flash("error", "Please login to continue.");
      return res.redirect("stafflogin");
    }
  } catch (err) {
    console.log(err);
  }
});

//Get view student
stafflogin.get("/viewstudent", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  return res.render("viewstudent");
});

// get view staffs
stafflogin.get("/view-staff", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  // check session
  let session = req.session;
  if (session.role == "admin") {
    var viewstaff = `SELECT *, CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstaff`;
    con.query(viewstaff, (err, result) => {
      if (err) throw err;
      else {
        res.locals.result = result;
        return res.status(200).render("viewstaff");
      }
    });
  } else {
    var viewstudent = `SELECT *, CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstudent`;
    con.query(viewstudent, (err, result) => {
      if (err) throw err;
      else {
        console.log(result);
        res.locals.result = result;
        return res.status(200).render("viewstudent");
      }
    });
  }
});

module.exports = stafflogin;
