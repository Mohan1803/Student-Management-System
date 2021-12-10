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
    const Capacity = req.body.capacity;

    if (Class == 0 || division == 0 || Capacity == 0) {
      err_msg = "Please Enter Values";
      return res.render("addclass", { err_msg });
    } else {
      var sql = `INSERT INTO school_addclass(Class,Division,Capacity) VALUES ('${Class}', '${division}', '${Capacity}')`;
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
