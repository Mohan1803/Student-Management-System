const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: "account",
    secret: "SecretStringForExpressSession",
    cookie: { maxAge: 1200000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

const addstud = require("./routes/addstudent");
const studlogin = require("./routes/studentlogin");
const addstaff = require("./routes/addstaff");
const stafflogin = require("./routes/stafflogin");
const addclass = require("./routes/addclass");
const studfee = require("./routes/studfee");

app.use("/student", addstud);
app.use("/student", studlogin);
app.use("/staff", addstaff);
app.use("/staff", stafflogin);
app.use("/class", addclass);
app.use("/staff", studfee);

app.get("/", (req, res) => {
  res.render("home");
});
const port = process.env.PORT || 6890;
app.listen(port, () => console.info(`Listening on port ${port}`));
