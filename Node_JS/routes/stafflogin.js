const express = require("express");
const stafflogin = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const con = require("../config/db");
const sendMail = require("../config/mail");

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
        error = "Oops!!!......Server Crashed....!!!!";
        res.render("servererror", { error });
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
    error = "Oops!!!......Server Crashed....!!!!";
    res.render("servererror", { error });
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
          error = "Oops!!!......Server Crashed....!!!!";
          res.render("servererror", { error });
        } else if (result.length == 1) {
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
    error = "Oops!!!......Server Crashed....!!!!";
    res.render("servererror", { error });
  }
});

//Get view student
stafflogin.get("/viewstudent", (req, res) => {
  var viewstud = `SELECT *, CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstudent`;
  con.query(viewstud, (err, student) => {
    if (err) {
      error = "Oops!!!......Server Crashed....!!!!";
      res.render("servererror", { error });
    } else {
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
      if (err) {
        error = "Oops!!!......Server Crashed....!!!!";
        res.render("servererror", { error });
      } else {
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

//Changing Staff Password

stafflogin.get("/staffchangepwd", (req, res) => {
  return res.render("staffchangepwd");
});

stafflogin.post("/staffchangepwd", (req, res) => {
  let error = "";
  let success = "";
  try {
    const pwd1 = req.body.pwd1;
    const pwd2 = req.body.pwd2;
    const pwd3 = req.body.pwd3;

    if (pwd1 == 0 || pwd2 == 0 || pwd3 == 0) {
      error = "Please Enter Some values";
      res.render("staffchangepwd", { error });
    }

    let session = req.session;

    if (session.Staff_id) {
      var sql = `SELECT * FROM school_addstaff WHERE Staff_id='${session.Staff_id}'`;
      con.query(sql, function (err, result) {
        if (err) {
          error = "Oops!!!......Server Crashed....!!!!";
          res.render("servererror", { error });
        } else if (result.length == 1) {
          const pwd = result[0].Password;
          const matchpass = bcrypt.compareSync(pwd1, pwd);
          const pwdformat =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,}$/;
          if (!pwd2.match(pwdformat)) {
            error =
              "Password Must have atleast 5 characters that include atleast 1 lowercase , 1 uppercase , 1 number & 1 special character in(!@#$%^&*)";
            res.render("staffchangepwd", { error });
          } else if (pwd1 == pwd2) {
            error = "New Password & Old Password Shouldn't Be Same";
            res.render("staffchangepwd", { error });
          } else if (matchpass) {
            if (pwd2 == pwd3) {
              var hashedpassword = bcrypt.hashSync(pwd2, 12);
              var change = `UPDATE school_addstaff SET Password = '${hashedpassword}' WHERE Staff_id='${session.Staff_id}'`;
              con.query(change, (err, result) => {
                if (err) {
                  throw err;
                } else {
                  success = "Password Changed Successfully";
                  res.render("staffchangepwd", { success });
                }
              });
            } else {
              error = "New Password Doesn't match";
              res.render("staffchangepwd", { error });
            }
          } else {
            error = "Incorrect Old Password";
            res.render("staffchangepwd", { error });
          }
        }
      });
    }
  } catch (err) {
    error = "Oops!!!......Server Crashed....!!!!";
    res.render("servererror", { error });
  }
});

stafflogin.get("/addnewstudent", (req, res) => {
  res.render("addnewstudent");
});

stafflogin.post("/addnewstudent", (req, res) => {
  let error = "";

  let success = "";

  try {
    const studid = req.body.studid;
    const Class = req.body.class;
    const section = req.body.section;
    const email = req.body.email;
    const pwd = req.body.pwd;
    var hashedpassword = bcrypt.hashSync(pwd, 12);
    if (studid == 0 || Class == 0 || section == 0 || email == 0 || pwd == 0) {
      error = "Please Enter Some values";
      res.render("addnewstudent", { error });
    } else {
      var sql = `SELECT * from school_initialaddstudent where Stud_ID = '${studid}'`;
      con.query(sql, (err, result) => {
        if (err) {
          error = "Server Crashed";
          res.render("servererror", { error });
        } else if (result == 1) {
          error = "Student ID Already Taken";
          res.render("addnewstudent", { error });
        } else {
          var newstud = `INSERT INTO school_initialaddstudent(Stud_ID,class,section,email_id,password) values ('${studid}','${Class}','${section}','${email}','${hashedpassword}')`;
          con.query(newstud, function (err) {
            if (err) {
              error = "Server Crashed";
              console.log(err);
              res.render("servererror", { error });
            } else {
              const mail = sendMail({
                from: process.env.MAIL_USERNAME,
                to: email,
                subject: "Your User ID and Password for your login purpose.",
                html: `<p>User ID: ${studid}  Password: ${pwd}</p>`,
              });
              mail
                .then((result) => {
                  console.log("Mail Sent", result);
                })
                .catch((err) => {
                  error = "Server Crashed";
                  return res.render("servererror", { error });
                });
              console.log("Student Record Inserted");
              success = "Student Added Successfully";
              return res.render("addnewstudent", { success });
            }
          });
        }
      });
    }
  } catch (err) {
    error = "Oops!!!......Server Crashed....!!!!";
    res.render("servererror", { error });
  }
});

module.exports = stafflogin;
