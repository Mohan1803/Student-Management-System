const express = require("express");
const staffRoute = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const con = require("../config/db");
const sendMail = require("../config/mail");
const { OAuth2Client } = require("google-auth-library");

//STAFF LOGIN GET // display form
staffRoute.get("/stafflogin", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  return res.render("stafflogin");
});

// staff login POST
staffRoute.post("/stafflogin", (req, res) => {
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
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.render("servererror");
      } else if (result.length == 1) {
        const pwd = result[0].Password;
        const matchPass = bcrypt.compareSync(PWD, pwd);

        if (matchPass) {
          let session = req.session;

          session.Staff_id = result[0].Staff_id;
          session.role = result[0].Role;

          session.logged_in = true;
          req.flash("welcome", `Hi ${session.Staff_id}`);
          return res.redirect("/staff/staffinfo");
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
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

// get STAFF Dashboard
staffRoute.get("/staffinfo", (req, res) => {
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
          console.log(err);
          req.flash("error", "Server Crashed");
          return res.render("servererror");
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
      req.flash("error", "TimesUp Please login to continue.");
      return res.redirect("/staff/stafflogin");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

//Get view student
staffRoute.get("/viewstudent", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  var viewstud = `SELECT 
  school_initialaddstudent.Stud_ID,
  school_initialaddstudent.email_id,
  school_initialaddstudent.section,
  school_addstudent.Middle_Name,
  school_addstudent.Father_name,
  school_addstudent.Mother_name,
  school_initialaddstudent.DOB,
  school_addstudent.Emergency_Contact_No,
  school_addsection.section,
  school_addclass.Class
   FROM
    school_initialaddstudent INNER JOIN school_addstudent ON school_initialaddstudent.ID = school_addstudent.Stud_ID 
     INNER JOIN school_addsection ON school_initialaddstudent.section=school_addsection.ID
     INNER JOIN school_addclass on school_addclass.ID = school_addsection.class_id`;
  con.query(viewstud, (err, student) => {
    if (err) {
      console.log(err);
      req.flash("error", "Server Crashed");
      return res.render("servererror");
    } else {
      res.locals.student = student;
      return res.render("viewstudent");
    }
  });
});

// get view staffs
staffRoute.get("/view-staff", (req, res) => {
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

staffRoute.get("/stafflogout", (req, res) => {
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
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

//Changing Staff Password

staffRoute.get("/staffchangepwd", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  return res.render("staffchangepwd");
});

staffRoute.post("/staffchangepwd", (req, res) => {
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
          console.log(err);
          req.flash("error", "Server Crashed");
          return res.render("servererror");
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
                  console.log(err);
                  req.flash("error", "Server Crashed");
                  return res.render("servererror");
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
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});
//Adding New Class

staffRoute.get("/addclass", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  // get all data from school_addclass - action - edit, delte modal
  try {
    var Class = `SELECT * FROM school_addclass `;
    con.query(Class, (err, result) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.redirect("servererror");
      } else {
        res.locals.result = result;
        return res.render("addclass");
      }
    });
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

staffRoute.post("/addclass", async (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;

  try {
    const Class = req.body.class;
    const Actual_fee = req.body.actualfee;

    if (Class == 0 || Actual_fee == 0) {
      req.flash("error", "Please Enter Values");
      return res.redirect("/staff/addclass");
    } else {
      var dup = `SELECT * FROM school_addclass WHERE Class = '${Class}'`;
      con.query(dup, (err, result) => {
        if (err) {
          throw err;
        } else if (result.length == 1) {
          const classId = result[0].ID;
          console.log(classId);
          req.flash("error", "Class Already Added");
          return res.redirect("/staff/addclass");
        } else {
          var sql = `INSERT INTO school_addclass(Class,Actual_fee) VALUES ('${Class}', '${Actual_fee}')`;
          con.query(sql, function (err) {
            if (err) {
              throw err;
            }
            req.flash("success", "Class Added Successfully");
            return res.redirect("/staff/addclass");
          });
        }
      });
    }
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

//Adding Section For Created Classes
staffRoute.get("/addsection", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  let session = req.session;
  try {
    // get data from school_addsection // table - edit modal

    var stud = `Select sas.class_id, sac.Class, sas.section, sas.capacity from school_addsection AS sas INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id; SELECT * FROM school_addclass`;
    con.query(stud, (err, result) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.redirect("/servererror");
      } else {
        // console.log(result);
        res.locals.result = result;
        return res.render("addsection");
      }
    });
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

staffRoute.post("/addsection", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  let session = req.session;
  try {
    const Class = req.body.class;
    const Section = req.body.section;
    const Capacity = req.body.capacity;
    if (Section == 0 || Capacity == 0) {
      req.flash("error", "Please Enter Some Values");
      return res.redirect("/staff/addsection");
    } else {
      var dup = `SELECT * FROM school_addsection where class_id = '${Class}' AND section = '${Section}'`;
      con.query(dup, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Server Crashed");
          return res.render("servererror");
        } else if (result.length == 1) {
          req.flash(
            "error",
            "Section " + Section + " for this Class is Already Created"
          );
          res.redirect("/staff/addsection");
        } else {
          var sec = `INSERT INTO school_addsection (class_id,section,capacity)values('${Class}','${Section}','${Capacity}')`;
          con.query(sec, (err, result) => {
            if (err) {
              console.log(err);
              req.flash("error", "Server Crashed");
              return res.render("servererror");
            } else {
              req.flash("success", "Section Added Successfully");
              return res.redirect("/staff/addsection");
            }
          });
        }
      });
    }
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

//Adding New Student
staffRoute.get("/addnewstudent", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;
  try {
    //TO get class and section from school_addclass & school_addsection tables
    var stud = `Select sas.class_id, sac.Class, sas.section, sas.ID, sas.capacity from school_addsection AS sas INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id`;
    con.query(stud, (err, result) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");

        return res.redirect("/servererror");
      } else {
        res.locals.result = result;
        return res.render("addnewstudent");
      }
    });
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

staffRoute.post("/addnewstudent", (req, res) => {
  let error = "";
  error = req.flash("error");
  res.locals.error = error;
  let success = "";
  success = req.flash("success");
  res.locals.success = success;

  try {
    const studid = req.body.stud_id;
    const section = req.body.section;
    const email = req.body.email;
    const dob = req.body.dob;
    const pwd = req.body.pwd;
    var hashedpassword = bcrypt.hashSync(pwd, 12);

    // //calculating age for students
    // var today = new Date();
    // var bday = new Date(dob);
    // var age = today.getFullYear() - bday.getFullYear();
    // var month = today.getMonth() - bday.getMonth();
    // if (month < 0 || today.getDate() < bday.getDate()) {
    //   age--;
    // }

    // if (
    //   (Class == 1 && age < 5) ||
    //   (Class == 2 && age < 6) ||
    //   (Class == 3 && age < 7) ||
    //   (Class == 4 && age < 8) ||
    //   (Class == 5 && age < 9) ||
    //   (Class == 6 && age < 10) ||
    //   (Class == 7 && age < 11) ||
    //   (Class == 8 && age < 12) ||
    //   (Class == 9 && age < 13) ||
    //   (Class == 10 && age < 14) ||
    //   (Class == 11 && age < 15) ||
    //   (Class == 12 && age < 16)
    // ) {
    //   error =
    //     "Age for the class " + Class + " doesn't match with the age " + age;
    //   return res.render("addnewstudent", { error });
    // }
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (studid.length < 5) {
      req.flash("error", "STUDENT ID VALUE IS TOO SHORT");
      return res.redirect("/staff/addnewstudent");
    } else if (!email.match(mailformat)) {
      req.flash("error", "INVALID MAIL ID");
      return res.redirect("/staff/addnewstudent");
    }
    if (studid == 0 || dob == 0 || section == 0 || email == 0 || pwd == 0) {
      error = "Please Enter Some values";
      return res.render("addnewstudent", { error });
    } else {
      var sql = `SELECT * from school_initialaddstudent where Stud_ID = '${studid}';`;
      con.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Server Crashed");
          return res.render("servererror");
        } else if (result.length == 1) {
          req.flash("error", "Student ID Already Taken");
          return res.redirect("/staff/addnewstudent");
        } else {
          var newstud = `INSERT INTO school_initialaddstudent(Stud_ID,section,DOB,email_id,password) values ('${studid}','${section}','${dob}','${email}','${hashedpassword}')`;
          con.query(newstud, function (err) {
            if (err) {
              console.log(err);
              req.flash("error", "Server Crashed");
              return res.render("servererror");
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
              req.flash("success", "Student Added Successfully");
              return res.redirect("/staff/addnewstudent");
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    error = "Oops!!!......Server Crashed....!!!!";
    res.render("servererror", { error });
  }
});

staffRoute.get("/addstaff", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;

  let success = req.flash("success");
  res.locals.success = success;
  return res.render("addstaff");
});

staffRoute.post("/addstaff", async (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;

  let success = req.flash("success");
  res.locals.success = success;
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
      req.flash("error", "Age Is Too Low For a Staff");
      return res.redirect("/staff/addstaff");
    }

    //encrypting password
    var hashedpassword = bcrypt.hashSync(Password, 12);

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!Email_id.match(mailformat)) {
      req.flash("error", "INVALID MAIL ID");
      return res.redirect("/staff/addstaff");
    } else if (Staff_id.length < 5) {
      req.flash("error", "Staff ID Value Is Too Short");
      return res.redirect("/staff/addstaff");
    } else if (Phone_Number.length < 10 || Emergency_Contact_No.length < 10) {
      req.flash("error", "Invalid Phone Number or Emergency Contact Number");
      return res.redirect("/staff/addstaff");
    } else {
      var dupstaff = `SELECT EXISTS (SELECT * FROM school_addstaff where Staff_id='${Staff_id}' OR Staff_Account_No='${Staff_Account_No}' OR Email_ID='${Email_id}' OR Aadhar_No='${Aadhar}') as count`;

      con.query(dupstaff, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Server Crashed");
          return res.render("servererror");
        } else if (result[0].count == 1) {
          req.flash(
            "error",
            "Duplicate Entries either in STAFF ID or ACCOUNT NUMBER or EMAIL ID or AADHAR NUMBER"
          );
          return res.redirect("/staff/addstaff");
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
                  console.log(err);
                  req.flash("error", "Server Crashed");
                  return res.render("servererror");
                });
              console.log("Staff Record Inserted");
              req.flash("success", "Staff Added Successffully");
              return res.redirect("/staff/addstaff");
            }
          });
        }
      });
    }
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

//Collect Fee

staffRoute.get("/admission-fee", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;

  let success = req.flash("success");
  res.locals.success = success;

  return res.render("studadmission");
});

staffRoute.post("/admission-fee", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  try {
    const payingamt = req.body.paying_amt;
    const studentid = req.body.studentid;
    const actualfee = req.body.actualfee_hide;
    // check in admission
    var dupStuAdmi = `SELECT * FROM school_studentadmission WHERE Stud_id='${studentid}'`;
    con.query(dupStuAdmi, (err, duplicate) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.render("servererror");
      } else if (duplicate.length != 0) {
        req.flash(
          "error",
          "Student Already Enrolled Please Collect Due in Due collection page"
        );
        return res.redirect("/staff/admission-fee");
      } else {
        var fee = `INSERT INTO school_studentadmission (Stud_id, Actual_fee, Paying_amt, Pending_due) VALUES ('${studentid}','${actualfee}','${payingamt}', '${actualfee}' - '${payingamt}' )`;
        con.query(fee, (err, result) => {
          if (err) {
            console.log(err);
            req.flash("error", "Server Crashed");
            return res.render("servererror");
          } else {
            req.flash("success", "Fee Collected Successfully");
            return res.redirect("/staff/admission-fee");
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.render("servererror");
  }
});

module.exports = staffRoute;
