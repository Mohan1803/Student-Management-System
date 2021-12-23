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
      return res.redirect("/staff/stafflogin");
    }
    var check = `SELECT * FROM school_addstaff WHERE Staff_id='${User_ID}'`;
    con.query(check, (err, result) => {
      if (err) {
        req.flash("error", "Oops!!!......Server Crashed....!!!!");
        res.redirect("/servererror");
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
    req.flash("error", "Oops!!!......Server Crashed....!!!!");
    res.redirect("/servererror");
  }
});

// get STAFF Dashboard
stafflogin.get("/staffinfo", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;

  let success = req.flash("success");
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
          req.flash("error", "Oops!!!......Server Crashed....!!!!");
          res.redirect("/servererror");
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
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  var viewstud = `SELECT * from school_initialaddstudent LEFT JOIN school_addstudent ON school_initialaddstudent.ID = school_addstudent.Stud_ID UNION ALL SELECT * from school_initialaddstudent RIGHT JOIN school_addstudent ON school_initialaddstudent.ID = school_addstudent.Stud_ID WHERE school_initialaddstudent.ID IS NULL`;
  con.query(viewstud, (err, student) => {
    if (err) {
      console.log(err);
      error = "Oops!!!......Server Crashed....!!!!";
      res.render("servererror", { error });
    } else {
      res.locals.student = student;
      return res.render("viewstudent");
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
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
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
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  return res.render("staffchangepwd");
});

stafflogin.post("/staffchangepwd", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  try {
    const pwd1 = req.body.pwd1;
    const pwd2 = req.body.pwd2;
    const pwd3 = req.body.pwd3;

    if (pwd1 == 0 || pwd2 == 0 || pwd3 == 0) {
      req.flash("error", "Please Enter Some values");
      res.redirect("/staff/staffchangepwd");
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
            req.flash(
              "error",
              "Password Must have atleast 5 characters that include atleast 1 lowercase , 1 uppercase , 1 number & 1 special character in(!@#$%^&*)"
            );
            res.redirect("/staff/staffchangepwd");
          } else if (pwd1 == pwd2) {
            req.flash("error", "New Password & Old Password Shouldn't Be Same");
            res.redirect("/staff/staffchangepwd");
          } else if (matchpass) {
            if (pwd2 == pwd3) {
              var hashedpassword = bcrypt.hashSync(pwd2, 12);
              var change = `UPDATE school_addstaff SET Password = '${hashedpassword}' WHERE Staff_id='${session.Staff_id}'`;
              con.query(change, (err, result) => {
                if (err) {
                  throw err;
                } else {
                  req.flash("success", "Password Changed Successfully");
                  res.redirect("/staff/staffinfo");
                }
              });
            } else {
              req.flash("error", "New Password Doesn't match");
              res.redirect("/staff/staffchangepwd");
            }
          } else {
            req.flash("error", "Incorrect Old Password");
            res.redirect("/staff/staffchangepwd");
          }
        } else {
          req.flash("error", "Not Found");
          res.redirect("/staff/staffinfo");
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
    const studid = req.body.stud_id;
    const Class = req.body.class;
    const section = req.body.section;
    const email = req.body.email;
    const dob = req.body.dob;
    const pwd = req.body.pwd;
    var hashedpassword = bcrypt.hashSync(pwd, 12);

    //calculating age for students
    var today = new Date();
    var bday = new Date(dob);
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
      error =
        "Age for the class " + Class + " doesn't match with the age " + age;
      return res.render("addnewstudent", { error });
    }
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (studid.length < 5) {
      error = "STUDENT ID VALUE IS TOO SHORT";
      return res.render("addnewstudent", { error });
    } else if (!email.match(mailformat)) {
      error = "INVALID MAIL ID";
      return res.render("addnewstudent", { error });
    }
    if (
      studid == 0 ||
      Class == 0 ||
      dob == 0 ||
      section == 0 ||
      email == 0 ||
      pwd == 0
    ) {
      error = "Please Enter Some values";
      res.render("addnewstudent", { error });
    } else {
      var sql = `SELECT * from school_initialaddstudent where Stud_ID = '${studid}'`;
      con.query(sql, (err, result) => {
        if (err) {
          error = "Server Crashed";
          res.render("servererror", { error });
        } else if (result.length == 1) {
          error = "Student ID Already Taken";
          res.render("addnewstudent", { error });
        } else {
          var newstud = `INSERT INTO school_initialaddstudent(Stud_ID,class,section,DOB,email_id,password) values ('${studid}','${Class}','${section}','${dob}','${email}','${hashedpassword}')`;
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

stafflogin.get("/addstaff", (req, res) => {
  res.render("addstaff");
});

stafflogin.post("/addstaff", async (req, res) => {
  let error = "";
  let success = "";
  let err_msg = "";
  try {
    const Staff_id = req.body.staffid;
    const Role = req.body.role;
    const First_Name = req.body.fname;
    const Middle_Name = req.body.mname;
    const Last_Name = req.body.lname;
    const Father_name = req.body.father_name;
    const Mother_name = req.body.mother_name;
    const DOB = req.body.dob || "01-01-0001";
    const Sex = req.body.sex;
    const Martial_Status = req.body.martial_status;
    const Joining_Date = req.body.jdate || "01-01-0001";
    const Qualification = req.body.qualification;
    const Aadhar = req.body.aadhar;
    const Staff_type = req.body.staff_type;
    const Staff_Account_No = req.body.saccno;
    const Blood_Group = req.body.bgroup;
    const Email_id = req.body.email;
    const Phone_Number = req.body.phno;
    const Emergency_Contact_No = req.body.emcno;
    const Basic_Pay = req.body.bpay;
    const Pre_Institute_Name = req.body.piname || "NIL";
    const Password = req.body.pwd;

    //calculating age for staffs
    var today = new Date();
    var bday = new Date(DOB);
    var age = today.getFullYear() - bday.getFullYear();
    var month = today.getMonth() - bday.getMonth();
    if (month < 0 || today.getDate() < bday.getDate()) {
      age--;
    }

    if (age < 25) {
      err_msg = "Age Is Too Low For a Staff";
      return res.render("addstaff", { err_msg });
    }

    //encrypting password
    var hashedpassword = bcrypt.hashSync(Password, 12);

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!Email_id.match(mailformat)) {
      err_msg = "INVALID MAIL ID";
      return res.render("addstaff", { err_msg });
    } else if (Staff_id.length < 5) {
      err_msg = "Staff ID Value Is Too Short";
      return res.render("createstaffid", { err_msg });
    } else if (Phone_Number.length < 10 || Emergency_Contact_No.length < 10) {
      err_msg = "Invalid Phone Number or Emergency Contact Number";
      return res.render("addstaff", { err_msg });
    } else {
      var dupstaff = `SELECT EXISTS (SELECT * FROM school_addstaff where Staff_id='${Staff_id}' OR Staff_Account_No='${Staff_Account_No}' OR Email_ID='${Email_id}' OR Aadhar_No='${Aadhar}') as count`;

      con.query(dupstaff, (err, result) => {
        if (err) {
          error = "Server Crashed";
          res.render("servererror", { error });
        } else if (result[0].count == 1) {
          err_msg =
            "Duplicate Entries either in STAFF ID or ACCOUNT NUMBER or EMAIL ID or AADHAR NUMBER";
          return res.render("addstaff", { err_msg });
        } else {
          var sql = `INSERT INTO school_addstaff(Staff_id, Role, First_Name, Middle_Name, Last_Name, Father_Name, Mother_name, DOB, Sex, Martial_Status, Joining_Date, Qualification, Aadhar_No, Staff_type, Staff_Account_No, Blood_Group, Email_ID, Phone_Number, Emergency_Contact_No, Basic_Pay, Pre_Institute_Name, Password) VALUES ('${Staff_id}', '${Role}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Sex}', '${Martial_Status}', '${Joining_Date}', '${Qualification}', '${Aadhar}', '${Staff_type}', '${Staff_Account_No}', '${Blood_Group}', '${Email_id}', '${Phone_Number}', '${Emergency_Contact_No}', '${Basic_Pay}', '${Pre_Institute_Name}', '${hashedpassword}')`;
          con.query(sql, function (err) {
            if (err) throw err;
            else {
              const mail = sendMail({
                from: process.env.MAIL_USERNAME,
                to: Email_id,
                subject: "Your User ID and Password for your login purpose.",
                html: `<p>User ID: ${Staff_id}  Password: ${Password}</p>`,
              });
              mail
                .then((result) => {
                  console.log("Mail Sent", result);
                })
                .catch((err) => {
                  error = "Server Crashed";
                  return res.render("servererror", { error });
                });
              console.log("Staff Record Inserted");
              success = "Staff Added Successffully";
              return res.render("addstaff", { success });
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

module.exports = stafflogin;
