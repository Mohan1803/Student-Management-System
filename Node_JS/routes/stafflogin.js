const express = require('express');
const bcrypt = require('bcrypt')
const stafflogin = express.Router()

const con = require('../db/db')




//STAFF LOGIN
stafflogin.get('/stafflogin', (req, res) => {
    res.render('stafflogin')
})

stafflogin.post('/stafflogin', (req, res) => {
    let err_msg = "";
    let success = "";
    let name = "";
    let staff_id = "";
    let role = "";
    let dob = "";
    let martial_status = "";
    let joining_date = "";
    let qualification = "";
    let aadhar = "";
    let staff_type = "";
    let acc_no = "";
    let bloodgrp = "";
    let emailid = "";
    let phone_no = "";
    let pre_institute_name = "";



    try {
        const User_ID = req.body.userid
        const PWD = req.body.pwd
        const rol = req.body.role

        var check = `SELECT * FROM school_addstaff WHERE Staff_id='${User_ID}'`
        con.query(check, (err, result) => {
            if (err) { throw err }
            else if (result.length == 1) {
                const pwd = result[0].Password;
                const matchPass = bcrypt.compareSync(PWD, pwd);

                if (matchPass) {
                    var sql = `SELECT *,CONCAT(First_Name,' ',Middle_Name,' ',Last_Name)as Full_Name from school_addstaff where Staff_id='${User_ID}' AND Password='${pwd}' AND Role='${rol}'`
                    con.query(sql, function (err, result) {
                        if (err) {
                            throw err
                        } else if (result.length == 1) {
                            name = result[0].Full_Name
                            staff_id = result[0].Staff_id
                            role = result[0].Role
                            dob = result[0].DOB
                            martial_status = result[0].Martial_Status
                            joining_date = result[0].Joining_Date
                            qualification = result[0].Qualification
                            aadhar = result[0].Aadhar_No
                            staff_type = result[0].Staff_type
                            acc_no = result[0].Staff_Account_No
                            bloodgrp = result[0].Blood_Group
                            emailid = result[0].Email_ID
                            phone_no = result[0].Phone_Number
                            pre_institute_name = result[0].Pre_Institute_Name

                            if (rol == 'admin') {
                                success = "Login Successfull";
                                return res.render('addstaff');
                            }
                            else {
                                success = "Login Successfull";
                                return res.render('staffinfo', {
                                    success, name, staff_id, role, dob, martial_status, joining_date,
                                    qualification, aadhar, staff_type, acc_no, bloodgrp, emailid, phone_no, pre_institute_name,
                                })
                            }
                        }
                        else {
                            err_msg = "Incorrect Role";
                            return res.render('stafflogin', { err_msg });
                        }
                    })
                } else if (!matchPass) {
                    err_msg = "Wrong Password";
                    return res.render('stafflogin', { err_msg });
                }
            } else {
                err_msg = "User Not Found";
                return res.render('stafflogin', { err_msg });
            }
        })




    } catch (e) {
        console.log(e)
    }
})



module.exports = stafflogin