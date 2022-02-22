const express = require("express");
const staffRoute = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const con = require("../config/db");
const sendMail = require("../config/mail");
const { OAuth2Client } = require("google-auth-library");
const { searchconsole } = require("googleapis/build/src/apis/searchconsole");

//STAFF LOGIN GET // display form
staffRoute.get("/stafflogin", (req, res) => {
  let error = req.flash("error");
  error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  return res.render("stafflogin");
});

// staff login POST
staffRoute.post("/stafflogin", (req, res) => {
  let error = req.flash("error");
  error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  let welcome = req.flash("welcome");
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

        return res.redirect("/staff/servererror");
      } else if (result.length != 0) {
        const pwd = result[0].Password;
        const matchPass = bcrypt.compareSync(PWD, pwd);

        if (matchPass) {
          let session = req.session;

          session.Staff_id = result[0].Staff_id;
          session.ID = result[0].ID;
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

    return res.redirect("/staff/servererror");
  }
});

// get STAFF Dashboard
staffRoute.get("/staffinfo", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;

  let success = req.flash("success");
  res.locals.success = success;

  let welcome = req.flash("welcome");
  res.locals.welcome = welcome;

  try {
    let session = req.session;
    if (session.Staff_id) {
      var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstaff where Staff_id='${session.Staff_id}' AND Role='${session.role}';
      SELECT sadsub.subject_name, sas.section, sac.Class, sws.period_no, sws.section_id, sws.staff_id, sws.ID, sws.day FROM school_weekschedule AS sws INNER JOIN school_addsubjects AS sadsub ON sadsub.ID = sws.subject_id
      INNER JOIN school_addsection AS sas ON sas.ID = sws.section_id
      INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id WHERE sws.staff_id = '${session.ID}'`;
      con.query(sql, function (err, result) {
        if (err) {
          console.log(err);

          return res.redirect("/staff/servererror");
        } else {
          res.locals.result = result;
          req.flash("success", "Welcome Back..!");
          return res.render("staffinfo");
        }
      });
    } else {
      req.flash("error", "TimesUp Please login to continue.");
      return res.redirect("/staff/stafflogin");
    }
  } catch (err) {
    console.log(err);

    return res.redirect("/staff/servererror");
  }
});

//Server Error
staffRoute.get("/servererror", (req, res) => {
  let error = req.flash("error");
  error = req.flash("error");
  res.locals.error = error;
  return res.render("servererror");
});

//Get view student
staffRoute.get("/viewstudent", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
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
      return res.redirect("/staff/servererror");
    } else {
      res.locals.student = student;
      return res.render("viewstudent");
    }
  });
});

// get view staffs
staffRoute.get("/view-staff", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
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
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    let session = req.session;
    if (session.id) {
      req.session.destroy();
      res.clearCookie("account");
      return res.redirect("/staff/stafflogin");
    }
  } catch (err) {
    console.log(err);

    return res.redirect("/staff/servererror");
  }
});

//Changing Staff Password

staffRoute.get("/staffchangepwd", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  return res.render("staffchangepwd");
});

staffRoute.post("/staffchangepwd", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
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

          return res.redirect("/staff/servererror");
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

                  return res.redirect("/staff/servererror");
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

    return res.redirect("/staff/servererror");
  }
});
//Adding New Class

staffRoute.get("/addclass", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  // get all data from school_addclass - action - edit, delte modal
  try {
    var Class = `SELECT * FROM school_addclass `;
    con.query(Class, (err, result) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else {
        res.locals.result = result;
        return res.render("addclass");
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

staffRoute.post("/addclass", async (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  try {
    const Class = section_id;
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

    return res.redirect("/staff/servererror");
  }
});

//Adding Section For Created Classes
staffRoute.get("/addsection", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  let session = req.session;
  try {
    // get data from school_addsection // table - edit modal

    var stud = `Select sas.class_id, sac.Class, sas.section, sas.capacity from school_addsection AS sas INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id; SELECT * FROM school_addclass`;
    con.query(stud, (err, result) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else {
        // console.log(result);
        res.locals.result = result;
        return res.render("addsection");
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

staffRoute.post("/addsection", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  let session = req.session;
  try {
    const Class = section_id;
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

          return res.redirect("/staff/servererror");
        } else if (result.length == 1) {
          req.flash(
            "error",
            "Section " + Section + " for this Class is Already Created"
          );
          res.redirect("/staff/addsection");
        } else {
          var sec = `INSERT INTO school_addsection (class_id,section,capacity) values('${Class}','${Section}','${Capacity}')`;
          con.query(sec, (err, result) => {
            if (err) {
              console.log(err);

              return res.redirect("/staff/servererror");
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

    return res.redirect("/staff/servererror");
  }
});

//Adding New Student
staffRoute.get("/addnewstudent", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    //TO get class and section from school_addclass & school_addsection tables
    var stud = `Select sas.class_id, sac.Class, sas.section, sas.ID, sas.capacity from school_addsection AS sas INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id`;
    con.query(stud, (err, result) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else {
        res.locals.result = result;
        return res.render("addnewstudent");
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

staffRoute.post("/addnewstudent", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
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

          return res.redirect("/staff/servererror");
        } else if (result.length == 1) {
          req.flash("error", "Student ID Already Taken");
          return res.redirect("/staff/addnewstudent");
        } else {
          var newstud = `INSERT INTO school_initialaddstudent(Stud_ID,section,DOB,email_id,password) values ('${studid}','${section}','${dob}','${email}','${hashedpassword}')`;
          con.query(newstud, function (err) {
            if (err) {
              console.log(err);

              return res.redirect("/staff/servererror");
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

          return res.redirect("/staff/servererror");
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

                  return res.redirect("/staff/servererror");
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

    return res.redirect("/staff/servererror");
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
    const studentid = req.body.studentid_fee;
    const actualfee = req.body.actualfee_hide;

    // check in admission
    var dupStuAdmi = `SELECT * FROM school_studentadmission WHERE Stud_id='${studentid}'`;
    con.query(dupStuAdmi, (err, duplicate) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else if (duplicate.length != 0) {
        req.flash(
          "error",
          "Student Already Enrolled Please Collect Due in This Page"
        );
        return res.redirect("/staff/student-due-collection");
      } else {
        if (payingamt > actualfee) {
          req.flash("error", "You Can't Collect More Than Actual Fee");
          return res.redirect("/staff/admission-fee");
        } else {
          var fee = `INSERT INTO school_studentadmission (Stud_id, Actual_fee, Initial_Paying_amt, Pending_due) VALUES ('${studentid}', '${actualfee}', '${payingamt}', '${actualfee}' - '${payingamt}' )`;
          con.query(fee, (err, result) => {
            if (err) {
              console.log(err);

              return res.redirect("/staff/servererror");
            } else {
              req.flash("success", "Fee Collected Successfully");
              return res.redirect("/staff/admission-fee");
            }
          });
        }
      }
    });
  } catch (err) {
    console.log(err);

    return res.redirect("/staff/servererror");
  }
});

//Collecting Due Module
staffRoute.get("/student-due-collection", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  return res.render("studentfeedue");
});

staffRoute.post("/student-due-collection", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  try {
    const payingamt = req.body.paying_amt_due;
    const payment_mode = req.body.payment_mode_due;
    const studentid = req.body.studentid_due;
    const actualfee = req.body.actualfee_hide_due;
    if (payingamt == 0) {
      req.flash("error", "Please Enter Valid Details In The Fields");
      return res.redirect("/staff/student-due-collection");
    }
    var find_stud = `SELECT * FROM school_studentadmission WHERE Stud_id = '${studentid}'`;
    con.query(find_stud, (err, found) => {
      if (err) {
        console.log(err);
        return res.redirect("/staff/servererror");
      } else if (found.length != 0) {
        var insert_due = `INSERT INTO school_student_due_collection (Stud_ID, Actual_fee, Paying_amt, Payment_mode) VALUES ('${studentid}', '${actualfee}', '${payingamt}', '${payment_mode}')`;
        con.query(insert_due, (err, inserted) => {
          if (err) {
            console.log(err);
            return res.redirect("/staff/servererror");
          } else {
            var update_admission = `UPDATE school_studentadmission SET Initial_Paying_amt = Initial_Paying_amt + ${payingamt} , Pending_due = Pending_due - ${payingamt} WHERE Stud_id = '${studentid}'`;
            con.query(update_admission, (err, updated) => {
              if (err) {
                console.log(err);
                return res.redirect("/staff/servererror");
              } else {
                req.flash("success", "Due Collected Successfully");
                return res.redirect("/staff/student-due-collection");
              }
            });
          }
        });
      } else {
        req.flash("error", "Admission Was Not Done For This Student");
        return res.redirect("/staff/admission-fee");
      }
    });
  } catch (err) {
    console.log(err);

    return res.redirect("/staff/servererror");
  }
});

//Adding Subjects
staffRoute.get("/addsubject", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    var subject = `SELECT * FROM school_addsubjects `;
    con.query(subject, (err, result) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else {
        res.locals.result = result;
        return res.render("addsubject");
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

staffRoute.post("/addsubject", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    const subjectName = req.body.sub_name;
    const actualMark = req.body.actualmark;
    const passMark = req.body.passmark;
    if (subjectName == 0 || actualMark == 0 || passMark == 0) {
      req.flash("error", "Please Enter Some Values In The Fields");
      return res.redirect("/staff/addsubject");
    } else {
      var duplicate_subject = `SELECT * FROM school_addsubjects WHERE subject_name = '${subjectName}'`;
      con.query(duplicate_subject, (err, duplicate) => {
        if (err) {
          console.log(err);

          return res.redirect("/staff/servererror");
        } else if (duplicate.length != 0) {
          req.flash(
            "error",
            "The Subject " +
              subjectName +
              " Is Already Present Try With Another Name"
          );
          return res.redirect("/staff/addsubject");
        } else {
          var insertSubject = `INSERT INTO school_addsubjects (subject_name) VALUES ('${subjectName}')`;
          con.query(insertSubject, (err, inserted) => {
            if (err) {
              console.log(err);

              return res.redirect("/staff/servererror");
            } else {
              req.flash(
                "success",
                "Subject " + subjectName + " Added Successfully"
              );
              return res.redirect("/staff/addsubject");
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);

    return res.redirect("/staff/servererror");
  }
});

// Mapping Subject Staff and Class
staffRoute.get("/mapping-staff-subject-class", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  try {
    var Class = `SELECT sas.class_id, sac.Class, sas.section, sas.ID, sas.capacity from school_addsection AS sas INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id; 

     SELECT * from school_addsubjects;

     SELECT sasub.subject_name, sast.Staff_id, sast.ID, sast.Middle_Name, sas.class_id, sac.Class, sas.section, school_subjectclass_mapping.Staff_ID, school_subjectclass_mapping.Section_id, school_subjectclass_mapping.Subject_id FROM school_subjectclass_mapping 
    INNER JOIN school_addstaff AS sast ON sast.ID = school_subjectclass_mapping.Staff_ID 
    INNER JOIN school_addsubjects AS sasub ON sasub.ID = school_subjectclass_mapping.Subject_id
    INNER JOIN school_addsection AS sas ON sas.ID = school_subjectclass_mapping.Section_id
    INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id;
    
     SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name FROM school_addstaff`;
    con.query(Class, (err, result) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else {
        res.locals.result = result;
        return res.render("mapping");
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

staffRoute.post("/mapping-staff-subject-class", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  try {
    const staff_id = req.body.staff_id_map;
    const section = req.body.section_map;
    const subject = req.body.subject_map;

    var insert_map = `INSERT INTO school_subjectclass_mapping (Staff_ID, Section_id, Subject_id) VALUES ('${staff_id}', '${section}', '${subject}')`;
    con.query(insert_map, (err, result) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else {
        req.flash("success", "Subject & Class Mapped To Staff Successfully");
        return res.redirect("/staff/mapping-staff-subject-class");
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

//Schedule Plan

staffRoute.get("/schedule-plan", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    var schedule = `SELECT * FROM school_scheduleplan`;
    con.query(schedule, (err, plan) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else {
        res.locals.plan = plan;
        return res.render("scheduleplan");
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

staffRoute.post("/schedule-plan", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    const scheduleName = schedule_id;
    const no_ofPeriods = req.body.no_of_periods;
    var dup = `SELECT * FROM school_scheduleplan WHERE schedule_name = '${scheduleName}'`;
    con.query(dup, (err, duplicate) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else if (duplicate.length != 0) {
        req.flash("error", "Duplicate Schedule Name");
        return res.redirect("/staff/schedule-plan");
      } else {
        var insert = `INSERT INTO school_scheduleplan (schedule_name, no_of_periods) VALUES ('${scheduleName}', '${no_ofPeriods}')`;
        con.query(insert, (err, inserted) => {
          if (err) {
            console.log(err);

            return res.redirect("/staff/servererror");
          } else {
            req.flash("success", "Schedule Plan Created Successfully");
            return res.redirect("/staff/schedule-plan");
          }
        });
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

//Week Schedule
staffRoute.get("/week-schedule", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    var Class_section = `SELECT sas.class_id, sac.Class, sas.section, sas.ID, sas.capacity from school_addsection AS sas INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id; 
    SELECT * FROM school_scheduleplan`;
    con.query(Class_section, (err, result) => {
      if (err) {
        console.log(err);

        return res.redirect("/staff/servererror");
      } else {
        res.locals.result = result;
        return res.render("weekschedule");
      }
    });
  } catch (e) {
    console.log(e);

    return res.redirect("/staff/servererror");
  }
});

staffRoute.post("/week-schedule", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  const day = req.body.day;
  const section_id = req.body.section;
  const schedule_id = req.body.schedule_template;
  const no_of_periods = req.body.no_of_periods;
  let Query = "";

  var dupschedule = `SELECT EXISTS (SELECT * FROM school_weekschedule WHERE day='${day}' AND section_id = '${section_id}') AS count`;
  con.query(dupschedule, (err, duplicate) => {
    if (err) {
      console.log(err);

      return res.redirect("/staff/servererror");
    } else if (duplicate[0].count == 1) {
      req.flash(
        "error",
        "Schedule of this Class Section for the " + day + " is exist."
      );
      return res.redirect("/staff/week-schedule");
    } else {
      for (let i = 0; i < no_of_periods; i++) {
        Query += `('${day}', '${section_id}', '${schedule_id}', '${
          req.body[`period_no_${i + 1}`]
        }', '${req.body[`period_${i + 1}_sub`]}', '${
          req.body[`period_${i + 1}_staff_hidden`]
        }'),`;
      }

      Query = Query.slice(0, -1);

      var insertWeekSchedule = `INSERT INTO school_weekschedule (day, section_id, schedule_id, period_no, subject_id, staff_id) VALUES ${Query}`;

      con.query(insertWeekSchedule, (err, inserted) => {
        if (err) {
          console.log(err);

          return res.redirect("/staff/servererror");
        } else {
          req.flash(
            "success",
            "Week Schedule For " + day + " Was Created Successfully"
          );
          // delete 0 values from table - soft delete
          var nullData = `UPDATE school_weekschedule SET Deleted_at = CURRENT_TIMESTAMP WHERE period_no='0'`;
          con.query(nullData, (err) => {
            if (err) throw err;
            return res.redirect("/staff/week-schedule");
          });
        }
      });
    }
  });
});

//Getting Staff Timetable page
staffRoute.get("/staff-timetable", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  let session = req.session;
  try {
    let session = req.session;
    if (session.Staff_id) {
      var sql = `SELECT sadsub.subject_name, sas.section, sac.Class, sws.period_no, sws.section_id, sws.staff_id, sws.ID, sws.day FROM school_weekschedule AS sws INNER JOIN school_addsubjects AS sadsub ON sadsub.ID = sws.subject_id
      INNER JOIN school_addsection AS sas ON sas.ID = sws.section_id
      INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id WHERE sws.staff_id = '${session.ID}'`;
      con.query(sql, function (err, result) {
        if (err) {
          console.log(err);

          return res.redirect("/staff/servererror");
        } else {
          res.locals.result = result;
          req.flash("success", "Welcome Back..!");
          return res.render("stafftimetable");
        }
      });
    } else {
      req.flash("error", "TimesUp Please login to continue.");
      return res.redirect("/staff/stafflogin");
    }
  } catch (err) {
    console.log(err);

    return res.redirect("/staff/servererror");
  }
});

//Attendance Module : Student Attendance
staffRoute.get("/stud-attendance/:section_id/:staff_id/:id", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  let session = req.session;
  try {
    let section_id = req.params.section_id;
    let staff_id = req.params.staff_id;
    let schedule_id = req.params.id;
    session.logged_in = true;
    if (staff_id == session.ID) {
      var studattendance = `SELECT sws.period_no, sws.section_id, sas.ID, sas.section, sac.Class FROM school_weekschedule AS sws INNER JOIN school_addsection AS sas ON sas.ID = sws.section_id
      INNER JOIN school_addclass AS sac ON sac.ID = sas.Class_id WHERE sas.ID = '${section_id}' AND sws.ID = '${schedule_id}';

      SELECT sias.Stud_ID, sias.ID, sadst.Middle_Name FROM school_initialaddstudent AS sias INNER JOIN school_addstudent AS sadst ON sadst.Stud_ID = sias.ID WHERE sias.section = '${section_id}';

      SELECT DATE_FORMAT(sstat.date,'%d-%M-%Y') AS Date, sstat.period_no, sstat.status, sias.Stud_ID, sac.Class, sas.section FROM school_studentattendance AS sstat INNER JOIN school_initialaddstudent AS sias ON sstat.Stud_ID = sias.ID
      INNER JOIN school_addsection AS sas ON sas.ID = sstat.class_section
      INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id WHERE marked_by = '${session.ID}' ORDER BY Date`;
      con.query(studattendance, (err, attenresult) => {
        if (err) {
          console.log(err);
          return res.redirect("/staff/servererror");
        } else {
          res.locals.attenresult = attenresult;
          return res.render("studentattendance");
        }
      });
    } else {
      req.flash("error", "Time Out Please Login Again");
      return res.redirect("/staff/stafflogin");
    }
  } catch (e) {
    console.log(e);
    return res.redirect("/staff/servererror");
  }
});

staffRoute.post("/stud-attendance", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  let session = req.session;

  const date = req.body.attendance_date_hide;
  const absent = req.body.attendance_absent;
  const present = req.body.attendance_present;
  const period_no = req.body.attendance_periodno;
  try {
    var dupAttendance = `SELECT * FROM school_studentattendance WHERE class_section = '${req.body.attendance_classsection_hide}' AND period_no = '${period_no}' AND date = CURDATE()`;
    con.query(dupAttendance, (err, duplicate) => {
      if (err) {
        console.log(err);
        return res.redirect("/staff/servererror");
      } else if (duplicate.length != 0) {
        req.flash("error", "Attendance For This Class Period Marked Already");
        return res.redirect("/staff/staff-timetable");
      } else {
        var absentDataEntry = "";
        var presentDataEntry = "";

        if (typeof absent !== "undefined") {
          for (let i = 0; i < absent.length; i++) {
            var absent_loop = `('${absent[i]}', '${req.body.attendance_classsection_hide}', '${period_no}', '${date}', 'Absent', '${session.ID}'),`;
            absentDataEntry = absentDataEntry + absent_loop;
          }
        } else {
          absentDataEntry = "";
        }

        if (typeof present !== "undefined") {
          for (let i = 0; i < present.length; i++) {
            var present_loop = `('${present[i]}', '${req.body.attendance_classsection_hide}', '${period_no}', '${date}', 'Present', '${session.ID}'),`;

            presentDataEntry = presentDataEntry + present_loop;
          }
        } else {
          presentDataEntry = "";
        }
        var finalQuery = (absentDataEntry + presentDataEntry).slice(0, -1);

        var insertAttendance = `INSERT INTO school_studentattendance (Stud_ID, class_section, period_no, date, status, marked_by) VALUES ${finalQuery}`;
        con.query(insertAttendance, (err, inserted) => {
          if (err) throw err;
          req.flash("success", "Attendance Added Successfully.");
          return res.redirect("/staff/staff-timetable");
        });
      }
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/staff/servererror");
  }
});

//Getting Student Adding Exam Page
staffRoute.get("/student-exam", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  var class_section = `SELECT sas.class_id, sac.Class, sas.section, sas.ID, sas.capacity from school_addsection AS sas INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id`;
  con.query(class_section, (err, result) => {
    if (err) {
      console.log(err);
      return res.redirect("/staff/servererror");
    } else {
      res.locals.result = result;
      return res.render("studentexam");
    }
  });
});

staffRoute.post("/student-exam", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  const exam_name = req.body.exam_name;
  const section_id = req.body.exam_section;
  const subject_count = req.body.subject_count; //2 (),(),
  let query = "";
  var dup = `SELECT * FROM school_addexam WHERE exam_name = '${exam_name}' AND section_id = '${section_id}' AND Deleted_at IS NULL`;
  con.query(dup, (err, dupExam) => {
    if (err) {
      console.log(err);
      return res.redirect("/staff/servererror");
    } else if (dupExam.length != 0) {
      req.flash("error", "Exam Already Assigned For This Class On This Date");
      return res.redirect("/staff/student-exam");
    } else {
      for (let i = 0; i < subject_count; i++) {
        query += `('${exam_name}', '${req.body.exam_master}', '${
          req.body[`exam_${i + 1}_date`]
        }', '${section_id}', '${req.body[`exam_${i + 1}_sub`]}', '${
          req.body[`exam_${i + 1}_actualmark`]
        }', '${req.body[`exam_${i + 1}_passmark`]}'),`;
      }

      query = query.slice(0, -1);
      //dynamically creating query
      var exam_insert = `INSERT INTO school_addexam (exam_name, exam_master, date, section_id, Subject_id, actual_mark, pass_mark) VALUES ${query}`;
      con.query(exam_insert, (err, inserted) => {
        if (err) {
          console.log(err);
          return res.redirect("/staff/servererror");
        } else {
          req.flash("success", "Exam Added Successfully");
          // delete 0 values from table - soft delete
          var nullData = `UPDATE school_addexam SET Deleted_at = CURRENT_TIMESTAMP WHERE Subject_id='0'`;
          con.query(nullData, (err) => {
            if (err) throw err;
            return res.redirect("/staff/student-exam");
          });
        }
      });
    }
  });
});

//Viewing Exams
staffRoute.get("/view-exam", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  var exam = `SELECT sac.Class, sas.section, sadsub.subject_name, sadex.exam_name, DATE_FORMAT(sadex.date,'%d-%m-%Y %H:%i') AS Date, sadex.ID, sadex.exam_master, sadex.section_id, sadex.actual_mark, sadex.pass_mark FROM school_addexam AS sadex 
  INNER JOIN school_addsubjects AS sadsub ON sadsub.ID = sadex.Subject_id
  INNER JOIN school_addsection AS sas ON sas.ID = sadex.section_id
  INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id 
  WHERE sadex.Deleted_at IS NULL GROUP BY sadex.exam_name , sadex.section_id`;
  con.query(exam, (err, result) => {
    if (err) {
      console.log(err);
      return res.redirect("/staff/servererror");
    } else {
      res.locals.result = result;
      return res.render("viewexam");
    }
  });
});

//Deleting Exams
staffRoute.get("/deleteExams/:section_id/:exam_master", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  var deleteexam = `UPDATE school_addexam SET Deleted_at = CURRENT_TIMESTAMP WHERE section_id = '${req.params.section_id}' AND exam_master = '${req.params.exam_master}'`;
  con.query(deleteexam, (err, softdeleted) => {
    if (err) {
      console.log(err);
      return res.redirect("/staff/servererror");
    } else {
      req.flash("success", "Exam Deleted Successfully");
      return res.redirect("/staff/view-exam");
    }
  });
});

//Edit Exams
staffRoute.post("/editExams/:exam_id/:exam_Master", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  console.log(req.body.edit_exam_date);
  var editexam = `UPDATE school_addexam SET date = '${req.body.edit_exam_date}' WHERE ID = '${req.params.exam_id}' AND exam_master = '${req.params.exam_Master}'`;
  console.log(editexam);
  con.query(editexam, (err, edit) => {
    if (err) {
      console.log(err);
      return res.redirect("/staff/servererror");
    } else {
      req.flash("success", "Exam Edited Successfully");
      return res.redirect("/staff/view-exam");
    }
  });
});
module.exports = staffRoute;
