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
    cookie: { maxAge: 120000000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));

const studentroute = require("./routes/studentRoute");
const staffroute = require("./routes/staffRoute");

app.use("/student", studentroute);
app.use("/staff", staffroute);

app.get("/", (req, res) => {
  res.render("home");
});
const port = process.env.PORT || 6890;
app.listen(port, () => console.info(`Listening on port ${port}`));
