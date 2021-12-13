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
          return res.status(200).redirect("/staff/staffinfo");
        } else {
          req.flash("error", "Incorrect Password.");
          return res.redirect("/staff/stafflogin");
        }
      } else {
        req.flash("error", "User Not Found");
        return res.redirect("/staff/stafflogin");
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

  try {
    let session = req.session;
    if (session.Staff_id) {
      var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstaff where Staff_id='${session.Staff_id}' AND Role='${session.role}'`;
      con.query(sql, function (err, result) {
        if (err) {
          throw err;
        } else if (result.length == 1) {
          // session.dob = result[0].DOB;
          // session.joiningdate = result[0].Joining_Date;
          // //getting date format
          // var date1 = new Date(dob);
          // var day = date1.getDate(); //Date of the month: 2 in our example
          // var month = date1.getMonth(); //Month of the Year: 0-based index, so 1 in our example
          // var year = date1.getFullYear();
          // const DOB1 = year + "-" + month + "-" + day;

          // var date2 = new Date(joiningdate);
          // var day1 = date2.getDate();
          // var month1 = date2.getMonth();
          // var year1 = date2.getFullYear();
          // const Joining_Date1 = year1 + "-" + month1 + "-" + day1;
          // res.locals.DOB1 = result;
          // res.locals.Joining_Date1 = result;

          res.locals.result = result;
          req.flash("success", "Welcome Back..!");
          return res.render("staffinfo");
        } else {
          req.flash("error", "Authentication failed.");
          return res.redirect("/staff/stafflogin");
        }
      });
    } else {
      req.flash("error", "Please login to continue.");
      return res.redirect("/staff/stafflogin");
    }
  } catch (err) {
    console.log(err);
  }
});

//Get view student
stafflogin.get("/viewstudent", (req, res) => {
  var viewstud = `SELECT *, CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstudent`;
  con.query(viewstud, (err, student) => {
    if (err) throw err;
    else {
      let error = "";
      error = req.flash("error");
      res.locals.error = error;
      let success = "";
      success = req.flash("success");
      res.locals.success = success;
      return res.status(200).render("viewstudent", { student });
    }
  });
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
        return res.status(200).render("viewstaff", { result });
      }
    });
  } else if (session.role == "staff") {
    return res.status(200).redirect("/viewstudent");
  } else {
    req.flash("error", "Not A Valid User");
    return res.redirect("/staff/stafflogin");
  }
});

//Staff Logout

stafflogin.get("/stafflogout", (req, res) => {
  try {
    let session = req.session;
    if (session.id) {
      req.session.destroy();
      res.clearCookie("account");
      console.log("logged out");
      return res.redirect("/staff/stafflogin");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = stafflogin;
