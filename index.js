const express = require("express")
const app = express()
const port = 9000
require("dotenv").config({ path: ".env" });
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
const Events = require("./routs/getEvents");


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:9000'], // Allow multiple origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true // Allow credentials
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

app.use(Events);