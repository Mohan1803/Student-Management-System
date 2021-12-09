const express = require("express");
const addclass = express.Router();
const con = require("../db/db");

//Getting class
addclass.get("/addclass", (req, res) => {
  res.render("addclass");
});

addclass.post("/addclass", async (req, res) => {
  let err_msg = "";
  let success = "";

  try {
    const Class = req.body.class;
    const division = req.body.division;

    if (Class == 0 || division == 0) {
      err_msg = "Please Enter Class & Division";
      return res.render("addclass", { err_msg });
    } else {
      var sql = `INSERT INTO school_addclass(Class,Division) VALUES ('${Class}', '${division}')`;
      con.query(sql, function (err) {
        if (err) throw err;

        console.log("Class Record Inserted");
        success = "Class Added Successffully";
        return res.render("addclass", { success });
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = addclass;
