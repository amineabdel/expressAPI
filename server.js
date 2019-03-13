
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv').config();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.listen(process.env.PORT || 4000, () => {
  console.log('Listening on port 4000 mathafacka')
})
app.use(session({
  cookie: {
    maxAge: 30 * 60 * 1000,
    httpOnly: true
  },
  name: 'SESS_ID',
  rolling: true,
  resave: false,
  saveUninitialized: true,
  secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use((req, res, next) => {
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Frame-Options', 'deny');
  res.header('X-Content-Type-Options', 'nosniff');
  next();
});

//var originsWhitelist = ['http://localhost:3000'];

var originsWhitelist = ['https://react-auth0.netlify.com/'];

var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};

/*
var apiData = [
  { id: 1, firstname: "amine", surname: "abdelfettah" },
  { id: 2, firstname: "vladislav", surname: "mataganov" }
];*/

var apiData = [{
  "id": 1,
  "firstname": "Amine",
  "surname": "Abdelfettah El Azimani"
},
{
  "id": 2,
  "firstname": "Vladislav",
  "surname": "Mataganov"
}]

app.get("/apiData", (req, res) => {
  req.session.save();
  res.cookie('firstname', apiData[0].firstname, { httpOnly: true });
  res.jsonp(apiData);
});






