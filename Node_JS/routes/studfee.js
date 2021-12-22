const express = require("express");
const studfee = express.Router();
const con = require("../config/db");

studfee.get("/studfee", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;
  res.render("studfee");
});

studfee.post("/studfee", (req, res) => {
  let error = req.flash("error");
  res.locals.error = error;
  let success = req.flash("success");
  res.locals.success = success;

  try {
    const Class = req.body.class;
    const section = req.body.division;
    const studid = req.body.studid;
    const name = req.body.name;
    const phno = req.body.phno;
    const email = req.body.Email;
    const actualfee = req.body.actualfee;
    const payingamt = req.body.paying_amt;

    var studdetail = `SELECT *, CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name  FROM school_addstudent WHERE Stud_ID='${studid}'`;
    con.query(studdetail, function (err, result) {
      if (err) {
        throw err;
      } else {
        const Name = result[0].Full_Name;
        const Phno = result[0].Emergency_Contact_No;
        const Email = result[0].Email_id;

        name.value = Name;
        phno.value = Phno;
        email.value = Email;
      }
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = studfee;
