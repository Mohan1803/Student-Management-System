const express = require("express");
const apiRoute = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const con = require("../config/db");

// For Admission(fee) Module

apiRoute.post("/get-student-data", (req, res) => {
  var fee = `SELECT sias.ID, sias.Stud_ID, sias.email_id, sadds.Middle_Name, sadds.Emergency_Contact_No, sas.section, sac.Class, sac.Actual_fee, ssad.Pending_due FROM school_initialaddstudent AS sias 
  INNER JOIN school_addstudent AS sadds ON sias.ID = sadds.Stud_ID 
  INNER JOIN school_addsection AS sas ON sias.section = sas.ID 
  INNER JOIN school_studentadmission AS ssad ON ssad.Stud_ID = sias.ID
  INNER JOIN school_addclass AS sac ON sas.class_id = sac.ID WHERE sias.Stud_ID='${req.body.student_id}'`;
  con.query(fee, (err, result) => {
    if (err) {
      res.json({ msg: "error", err });
    } else if (result.length != 0) {
      res.json({ msg: "success", result: result });
    } else {
      res.json({ msg: "Student Not Found", err });
    }
  });
});

//For Due Module

apiRoute.post("/get-student-data-due", (req, res) => {
  var due = `SELECT sias.ID, sias.Stud_ID, sias.email_id, sadds.Middle_Name, sadds.Emergency_Contact_No, sas.section, sac.Class, sac.Actual_fee, ssad.Initial_Paying_amt, ssad.Pending_due FROM school_initialaddstudent AS sias 
  INNER JOIN school_addstudent AS sadds ON sias.ID = sadds.Stud_ID 
  INNER JOIN school_addsection AS sas ON sias.section = sas.ID 
  INNER JOIN school_studentadmission AS ssad ON ssad.Stud_ID = sias.ID
  INNER JOIN school_addclass AS sac ON sas.class_id = sac.ID WHERE sias.Stud_ID='${req.body.studid_due}'`;
  con.query(due, (err, dueresult) => {
    if (err) {
      res.json({ msg: "error", err });
    } else if (dueresult.length != 0) {
      res.json({ msg: "success", dueresult: dueresult });
    } else {
      res.json({ msg: "Student Not Found", err });
    }
  });
});

//For Week Schedule Module

apiRoute.post("/get-schedule", (req, res) => {
  var schedule = `SELECT * FROM school_scheduleplan`;
  con.query(schedule, (err, result) => {
    if (err) {
      res.json({ msg: "error", err });
    } else if (result.length != 0) {
      res.json({ msg: "success", result: result });
    } else {
      res.json({ msg: "No Schedule Found", err });
    }
  });
});

module.exports = apiRoute;
