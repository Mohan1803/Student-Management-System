const express = require("express");
const bcrypt = require("bcrypt");
const studentRoute = express.Router();
const session = require("express-session");
const con = require("../config/db");
const sendMail = require("../config/mail");

//getting student login page - GET
studentRoute.get("/studentlogin", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  res.render("studentlogin");
});

// POST student Login
studentRoute.post("/studentlogin", async (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    const User_ID = req.body.userid;
    const PWD = req.body.pwd;

    var check = `SELECT * FROM school_initialaddstudent WHERE Stud_ID='${User_ID}'`;
    con.query(check, (err, result) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.redirect("/staff/servererror");
      } else if (result.length == 1) {
        const pwd = result[0].password;
        const matchPass = bcrypt.compareSync(PWD, pwd);

        if (matchPass) {
          let session = req.session;
          session.studentId = result[0].ID;
          session.pass = result[0].Password;
          session.section = result[0].section;
          session.loggedIn = true;
          return res.redirect("/student/student-profile");
        } else {
          req.flash("error", "Incorrect Password");
          return res.redirect("/student/studentlogin");
        }
      } else {
        req.flash("error", "Student Not Found");
        return res.redirect("/student/studentlogin");
      }
    });
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

// showing student info here
studentRoute.get("/student-profile", (req, res) => {
  let session = req.session;
  let success = req.flash("success");
  res.locals.success = success;
  let error = req.flash("error");
  res.locals.error = error;
  try {
    // run a query and display render
    var stuLoginInfor = `SELECT * , CONCAT(First_Name, " ",Middle_Name, " ",Last_Name) as Full_Name FROM school_addstudent WHERE Stud_ID='${session.studentId}'`;
    con.query(stuLoginInfor, (err, result) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.redirect("/staff/servererror");
      } else if (result.length == 1) {
        const Id = result[0].ID;
        var studProfile = `SELECT 
        school_initialaddstudent.Stud_ID,
        school_initialaddstudent.email_id,
        school_initialaddstudent.section,
        school_addstudent.First_Name,
        school_addstudent.Middle_Name,
        school_addstudent.Last_Name,
        school_addstudent.Father_name,
        school_addstudent.Mother_name,
        school_initialaddstudent.DOB,
        school_addstudent.Emergency_Contact_No,
        school_addstudent.Stud_Aadhar_No,
        school_addsection.section,
        school_addclass.Class
         FROM
          school_initialaddstudent INNER JOIN school_addstudent ON school_initialaddstudent.ID = school_addstudent.Stud_ID 
           INNER JOIN school_addsection ON school_initialaddstudent.section=school_addsection.ID
           INNER JOIN school_addclass on school_addclass.ID = school_addsection.class_id WHERE school_initialaddstudent.ID='${Id}'`;
        con.query(studProfile, (err, profile) => {
          if (err) {
            console.log(err);
            req.flash("error", "Server Crashed");
            return res.redirect("/staff/servererror");
          } else {
            res.locals.profile = profile;
            return res.render("studinfo");
          }
        });
      } else {
        return res.redirect("/student/create-student-profile");
      }
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

// creating student profile for the first time - GET
studentRoute.get("/create-student-profile", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    let session = req.session;
    var stud = `Select * from school_initialaddstudent where ID = '${session.studentId}' `;
    con.query(stud, (err, result) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.redirect("/staff/servererror");
      } else if (result.length == 1) {
        res.locals.result = result;
        return res.render("studprofilecreation");
      } else {
        req.flash("error", "Times Up Please Login Again");
        return res.redirect("/student/studentlogin");
      }
    });
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

// creating student Profile 1st time - POST
studentRoute.post("/create-student-profile", (req, res) => {
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
      Emergency_Contact_No == 0 ||
      Religion == 0 ||
      Caste == 0 ||
      Mother_Tongue == 0 ||
      Stud_Aadhar_No == 0 ||
      Sex == 0
    ) {
      req.flash("error", "Please fill all details");
      return res.redirect("/student/create-student-profile");
    } else if (Emergency_Contact_No.length < 10) {
      req.flash("error", "Invalid Phone Nummber");
      return res.redirect("/student/create-student-profile");
    } else {
      var dup = `SELECT * FROM school_addstudent WHERE Stud_Aadhar_No = '${Stud_Aadhar_No}'`;
      con.query(dup, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Server Crashed");
          return res.redirect("/staff/servererror");
        } else if (result.length == 1) {
          req.flash("error", "Duplicate Aadhar Number");
          return res.redirect("/student/create-student-profile");
        } else {
          var sql = `INSERT INTO school_addstudent(Stud_ID, First_Name, Middle_Name, Last_Name, Father_name, Mother_name, Emergency_Contact_No, Religion, Caste, Mother_Tongue, Stud_Aadhar_No, Sex) VALUES ('${session.studentId}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${Emergency_Contact_No}', '${Religion}', '${Caste}', '${Mother_Tongue}', '${Stud_Aadhar_No}', '${Sex}');`;
          con.query(sql, function (err, inserted) {
            if (err) {
              console.log(err);
              req.flash("error", "Server Crashed");
              return res.redirect("/staff/servererror");
            } else {
              console.log("Student Record Inserted");
              req.flash("success", "Profile Created Successfully");
              return res.redirect("/student/student-profile");
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

//getting student fee
studentRoute.get("/studfee", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    let session = req.session;
    if (session) {
      var stud = `SELECT school_initialaddstudent.Stud_ID, school_initialaddstudent.email_id, school_studentadmission.pending_due, sadds.Middle_Name, sadds.Emergency_Contact_No, sac.Class, sac.Actual_fee, sas.section FROM school_addstudent AS sadds 
      INNER JOIN school_initialaddstudent  ON sadds.Stud_ID = school_initialaddstudent.ID 
      INNER JOIN school_addsection AS sas ON sas.ID = school_initialaddstudent.section 
      INNER JOIN school_addclass AS sac ON sas.class_id = sac.ID 
      INNER JOIN school_studentadmission ON school_studentadmission.Stud_id = school_initialaddstudent.ID WHERE school_initialaddstudent.ID= '${session.studentId}'`;
      con.query(stud, (err, result) => {
        if (err) {
          console.log(err);
          req.flash("error", "Server Crashed");
          return res.redirect("/staff/servererror");
        } else {
          res.locals.result = result;
          return res.render("studfee");
        }
      });
    } else {
      req.flash("error", "NOT Loggedin");
      return res.redirect("/");
    }
  } catch (e) {
    console.log(e);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

studentRoute.post("/studfee", (req, res) => {
  let session = req.session;
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    const actualfee = req.body.actualfee_hide;
    const payingamt = req.body.paying_amt;

    var find_stud = `SELECT * FROM school_studentadmission WHERE Stud_id = '${session.studentId}'`;
    con.query(find_stud, (err, found) => {
      if (err) {
        console.log(err);
        return res.redirect("/staff/servererror");
      } else if (found.length != 0) {
        var insert_due = `INSERT INTO school_student_due_collection (Stud_ID, Actual_fee, Paying_amt, Payment_mode) VALUES ('${session.studentId}', '${actualfee}', '${payingamt}', '${req.body.payment_mode_stud}')`;
        con.query(insert_due, (err, inserted) => {
          if (err) {
            console.log(err);
            return res.redirect("/staff/servererror");
          } else {
            var update_admission = `UPDATE school_studentadmission SET Initial_Paying_amt = Initial_Paying_amt + ${payingamt} , Pending_due = Pending_due - ${payingamt} WHERE Stud_id = '${session.studentId}'`;
            con.query(update_admission, (err, updated) => {
              if (err) {
                console.log(err);
                return res.redirect("/staff/servererror");
              } else {
                req.flash("success", "Fee Paid Successfully");
                return res.redirect("/student/student-profile");
              }
            });
          }
        });
      } else {
        req.flash(
          "error",
          "Admission Was Not Done Please Inform Your Teacher or Admin"
        );
        return res.redirect("/student/student-profile");
      }
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

//Changing Password For Students By Their Own
studentRoute.get("/changepwd", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  res.render("changepwd");
});

studentRoute.post("/changepwd", (req, res) => {
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
      res.redirect("/student/changepwd");
    }

    let session = req.session;

    var sql = `SELECT * FROM school_initialaddstudent WHERE ID='${session.studentId}'`;
    con.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.redirect("/staff/servererror");
      } else if (result.length == 1) {
        const pwd = result[0].password;
        const matchpass = bcrypt.compareSync(pwd1, pwd);
        const pwdformat =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,}$/;
        if (!pwd2.match(pwdformat)) {
          req.flash(
            "error",
            "Password Must have atleast 5 characters that include atleast 1 lowercase , 1 uppercase , 1 number & 1 special character in(!@#$%^&*)"
          );
          return res.redirect("/student/changepwd");
        } else if (pwd1 == pwd2) {
          req.flash("error", "New Password & Old Password Shouldn't Be Same");
          return res.redirect("/student/changepwd");
        } else if (matchpass) {
          if (pwd2 == pwd3) {
            var hashedpassword = bcrypt.hashSync(pwd2, 12);
            var change = `UPDATE school_initialaddstudent SET password = '${hashedpassword}' WHERE ID='${session.studentId}'`;
            con.query(change, (err, result) => {
              if (err) {
                console.log(err);
                req.flash("error", "Server Crashed");
                return res.redirect("/staff/servererror");
              } else {
                req.flash("success", "Password Changed Successfully");
                return res.redirect("/student/student-profile");
              }
            });
          } else {
            req.flash("error", "New Password Doesn't match");
            return res.redirect("/student/changepwd");
          }
        } else {
          req.flash("error", "Incorrect Old Password");
          return res.redirect("/student/changepwd");
        }
      } else {
        req.flash("error", "No User Found");
        return res.redirect("/student/studentlogin");
      }
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

//Student Logout
studentRoute.get("/studlogout", (req, res) => {
  try {
    let session = req.session;
    if (session.id) {
      req.session.destroy();
      res.clearCookie("account");
      return res.redirect("/student/studentlogin");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

//Viewing Exams By Students
studentRoute.get("/view_exam", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    let session = req.session;
    var viewExam = `SELECT sadex.exam_name, DATE_FORMAT(sadex.date,'%d-%m-%Y %H:%i') AS Date, sasub.subject_name FROM school_addexam AS sadex INNER JOIN school_addsubjects AS sasub ON sadex.Subject_id = sasub.ID WHERE sadex.section_id = '${session.section}'`;
    con.query(viewExam, (err, result) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.redirect("/staff/servererror");
      } else {
        res.locals.result = result;
        return res.render("studentviewexams");
      }
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

//Showing Results To Students
studentRoute.get("/result", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  try {
    let session = req.session;
    var studResult = `SELECT saex.actual_mark, sexma.exam_name, sexma.marks_scored, sexma.result, sasub.subject_name FROM school_studexam_mark AS sexma 
    INNER JOIN school_addsubjects AS sasub ON sexma.subject_id = sasub.ID 
    INNER JOIN school_addexam AS saex ON saex.Subject_id = sexma.subject_id WHERE sexma.stud_id = '${session.studentId}' AND saex.section_id = '${session.section}'`;
    con.query(studResult, (err, studentresult) => {
      if (err) {
        console.log(err);
        req.flash("error", "Server Crashed");
        return res.redirect("/staff/servererror");
      } else {
        res.locals.studentresult = studentresult;
        return res.render("studresult");
      }
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "Server Crashed");
    return res.redirect("/staff/servererror");
  }
});

module.exports = studentRoute;
