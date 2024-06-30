const express = require("express")
const app = express()
const port = 9000
require("dotenv").config({ path: "./secret/.env" });
const dbPass = process.env.DB_PASS;
const mongoose = require('mongoose');
const cors = require('cors');

const Register = require('./routs/register')
const Login = require('./routs/login')
const Gokarts = require('./routs/CreateGokart')
const Event = require('./routs/Event')
const EventData = require('./routs/GetEventInfo')
const GokartsInfo = require('./routs/getGokartsInfo')
const updateGokart = require('./routs/upadteGokarts')
const Stint = require('./routs/createStint');
const authenticateToken = require("./routs/auth");


app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

mongoose.connect(dbPass, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));

  
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// app.get('/users', authenticateToken ,(req,res)=>{
//   res.json(useres.filter(users => users.id === req.user.userId))
// })
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