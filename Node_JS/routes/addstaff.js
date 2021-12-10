const express = require("express");
const bcrypt = require("bcrypt");
const addstaff = express.Router();
const con = require("../db/db");
const { DATETIME } = require("mysql/lib/protocol/constants/types");

//ADDING STAFF

addstaff.get("/addstaff", (req, res) => {
  res.render("addstaff");
});

addstaff.post("/addstaff", async (req, res) => {
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
        if (err) throw err;
        else if (result[0].count == 1) {
          err_msg =
            "Duplicate Entries either in STAFF ID or ACCOUNT NUMBER or EMAIL ID or AADHAR NUMBER";
          return res.render("addstaff", { err_msg });
        } else {
          var sql = `INSERT INTO school_addstaff(Staff_id, Role, First_Name, Middle_Name, Last_Name, Father_Name, Mother_name, DOB, Sex, Martial_Status, Joining_Date, Qualification, Aadhar_No, Staff_type, Staff_Account_No, Blood_Group, Email_ID, Phone_Number, Emergency_Contact_No, Basic_Pay, Pre_Institute_Name, Password) VALUES ('${Staff_id}', '${Role}', '${First_Name}', '${Middle_Name}', '${Last_Name}', '${Father_name}', '${Mother_name}', '${DOB}', '${Sex}', '${Martial_Status}', '${Joining_Date}', '${Qualification}', '${Aadhar}', '${Staff_type}', '${Staff_Account_No}', '${Blood_Group}', '${Email_id}', '${Phone_Number}', '${Emergency_Contact_No}', '${Basic_Pay}', '${Pre_Institute_Name}', '${hashedpassword}')`;
          con.query(sql, function (err) {
            if (err) throw err;

            console.log("Staff Record Inserted");
            success = "Staff Added Successffully";
            return res.render("addstaff", { success });
          });
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = addstaff;
