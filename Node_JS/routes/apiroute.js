const express = require("express");
const apiRoute = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const con = require("../config/db");

apiRoute.post("/get-student-data", (req, res) => {
  var fee = `SELECT sias.Stud_ID, sias.email_id, sadds.Middle_Name, sadds.Emergency_Contact_No, sas.section, sac.Class, sac.Actual_fee FROM school_initialaddstudent AS sias INNER JOIN school_addstudent AS sadds ON sias.ID = sadds.Stud_ID INNER JOIN school_addsection AS sas ON sias.section = sas.ID INNER JOIN school_addclass AS sac ON sas.class_id = sac.ID WHERE sias.Stud_ID='${req.body.student_id}'`;
  con.query(fee, (err, result) => {
    if (err) {
      res.json({ msg: "error", err });
    } else if (result.length == 1) {
      res.json({ msg: "success", result: result });
    } else {
      res.json({ msg: "error", err });
    }
  });
});

module.exports = apiRoute;
