const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bcrypt = require('bcrypt')


const port = 8080


const addstud = require('./routes/addstudent')
const studlogin = require('./routes/studentlogin')
const addstaff = require('./routes/addstaff')
const stafflogin = require('./routes/stafflogin')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(expressLayouts);
app.set('layout', './layouts/layout');

app.use('/student', addstud);
app.use('/student', studlogin);
app.use('/staff', addstaff)
app.use('/staff', stafflogin)



app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  res.render('home');
})

app.post('/', async (req, res) => {

})



app.listen(port, () => console.info(`Listening on port ${port}`))

