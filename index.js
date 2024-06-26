const express = require("express")
const app = express()
const port = 9000
require("dotenv").config({ path: "./secret/.env" });
const dbPass = process.env.DB_PASS;
const mongoose = require('mongoose');


const Register = require('./routs/register')
const Login = require('./routs/login')
const Gokarts = require('./routs/CreateGokart')
const Event = require('./routs/Event')
const EventData = require('./routs/GetEventInfo')
const GokartsInfo = require('./routs/getGokartsInfo')
const updateGokart = require('./routs/upadteGokarts')
const Stint = require('./routs/createStint')


mongoose.connect(dbPass, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));

  
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(Register);

app.use(Login);

app.use(Event);

app.use(Gokarts);

app.use(EventData);

app.use(GokartsInfo);

app.use(updateGokart);

app.use(Stint);