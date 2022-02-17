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

// Checking duplicate schedules
apiRoute.post("/get-weekschedule", (req, res) => {
  var dupweekschedule = `SELECT EXISTS (SELECT * FROM school_weekschedule WHERE day = '${req.body.day}' AND section_id = '${req.body.class_section}') AS count`;
  con.query(dupweekschedule, (err, found) => {
    if (err) res.json({ msg: "error", err });
    res.json({ msg: "success", found: found[0].count });
  });
});

// Getting No Of Periods from scheduleplan table
apiRoute.post("/get-noofperiods-from-scheduleplan", (req, res) => {
  var no_of_periods = `SELECT * FROM school_scheduleplan WHERE id='${req.body.schedule_temp}';
   SELECT sscm.Subject_id, sadsub.ID, sadsub.subject_name, sscm.Section_id, sscm.Staff_ID, sadst.Middle_Name FROM school_subjectclass_mapping AS sscm 
   INNER JOIN school_addsubjects AS sadsub ON sadsub.ID = sscm.Subject_id 
   INNER JOIN school_addstaff AS sadst ON sadst.ID = sscm.Staff_ID
   INNER JOIN school_addsection AS sas ON sas.ID = sscm.Section_id
    WHERE sscm.Section_id = '${req.body.class_section}'`;
  con.query(no_of_periods, (err, periodNo) => {
    if (err) res.json({ msg: "error", err });
    else {
      res.json({
        msg: "success",
        periods: periodNo[0],
        subjects: periodNo[1],
      });
    }
  });
});

//Getting Staffs According to the subject, class & section

apiRoute.post("/getting-staff", (req, res) => {
  var Staffs = `SELECT sadst.ID, sadst.Staff_id, sadst.Middle_Name, sscm.Staff_ID, sscm.Subject_id, sscm.Section_id FROM school_addstaff AS sadst INNER JOIN school_subjectclass_mapping AS sscm ON sadst.ID = sscm.Staff_ID 
  INNER JOIN school_addsubjects ON sscm.Subject_id = school_addsubjects.ID WHERE sscm.Section_id = '${req.body.class_section}' AND sscm.Subject_id = '${req.body.subject_id}'`;

  con.query(Staffs, (err, staffname) => {
    if (err) res.json({ msg: "error", err });
    else if (Staffs.length != 0) {
      res.json({ msg: "success", staff: staffname });
    } else {
      res.json({ msg: "error", err });
    }
  });
});

//Getting No Of Subjects Mapped To Particular Class & Section
apiRoute.post("/get-noofsubjects-associated-with-class", (req, res) => {
  var no_of_subjects = `SELECT sscm.Subject_id, sscm.Section_id, sasub.subject_name, sasub.ID FROM school_subjectclass_mapping AS sscm INNER JOIN school_addsubjects AS sasub ON sscm.Subject_id = sasub.ID WHERE sscm.Section_id = '${req.body.exam_section}'`;
  con.query(no_of_subjects, (err, subjects) => {
    if (err) res.json({ msg: "error", err });
    else if (subjects.length != 0) {
      res.json({
        msg: "success",
        subject: subjects,
      });
    } else {
      res.json({ msg: "error", subject: subjects });
    }
  });
});

//Modal View For Created Exams
apiRoute.post("/get-exam-details", (req, res) => {
  var getExams = `SELECT sac.Class, sas.section, sadsub.subject_name, sadex.exam_name,  DATE_FORMAT(sadex.date,'%d-%M-%Y  %H:%i') AS Date, sadex.actual_mark, sadex.pass_mark FROM school_addexam AS sadex
 INNER JOIN school_addsubjects AS sadsub ON sadsub.ID = sadex.Subject_id
 INNER JOIN school_addsection AS sas ON sas.ID = sadex.section_id
 INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id WHERE sadex.section_id = '${req.body.section_id}' AND sadex.exam_master = '${req.body.exam_master}'AND sadex.Deleted_at IS NULL`;
  con.query(getExams, (err, examList) => {
    if (err) {
      res.json({ msg: "error", err });
    } else {
      res.json({ msg: "success", examList: examList });
    }
  });
});

//Deleting Created Exams
apiRoute.post("/delete-exam-details", (req, res) => {
  var deleteExams = `SELECT sac.Class, sas.section, sadsub.subject_name, sadex.exam_name,  DATE_FORMAT(sadex.date,'%d-%M-%Y  %H:%i') AS Date, sadex.exam_master, sadex.actual_mark, sadex.pass_mark FROM school_addexam AS sadex
  INNER JOIN school_addsubjects AS sadsub ON sadsub.ID = sadex.Subject_id
  INNER JOIN school_addsection AS sas ON sas.ID = sadex.section_id
  INNER JOIN school_addclass AS sac ON sac.ID = sas.class_id WHERE sadex.section_id = '${req.body.section_id}' AND sadex.exam_master = '${req.body.exam_master}'`;
  con.query(deleteExams, (err, deleteexams) => {
    if (err) {
      res.json({ msg: "error", err });
    } else {
      res.json({ msg: "success", deleteexams: deleteexams });
    }
  });
});

module.exports = apiRoute;
