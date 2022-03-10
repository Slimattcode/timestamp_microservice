// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
require("dotenv").config("myEnvFile.env");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// api without input date
app.get("/api", (req, res) => {
  let today = new Date()
  let year = Number(today.getUTCFullYear());
  let month = Number(today.getUTCMonth());
  let day = Number(today.getUTCDate());
  let hour = Number(today.getUTCHours())
  let min = Number(today.getUTCMinutes());
  let sec = Number(today.getUTCSeconds());
  let utcMillisec = Date.UTC(year, month, day, hour, min, sec);
  let utcDate = new Date(utcMillisec);
  res.json({unix: utcMillisec, utc: utcDate.toUTCString()})
})

// api with input date
app.get("/api/:date", (req, res) => {
  let regex = /^\d+$/;
  let date = new Date(req.params.date);
  if (date.toString() !== "Invalid Date" && !regex.test(req.params.date)) {
    let year = Number(date.getFullYear());
    let month = Number(date.getMonth());
    let day = Number(date.getDate());
    let hour = Number(date.getHours())
    let min = Number(date.getMinutes());
    let sec = Number(date.getSeconds());
    let utcMillisec = Date.UTC(year, month, day, hour, min, sec)
    let utcDate = new Date(utcMillisec);
  return res.json({ unix: utcMillisec, utc: utcDate.toUTCString()})
  } else if (regex.test(req.params.date)) {
    return res.json({ unix: Number(req.params.date), utc: new Date(Number(req.params.date)).toUTCString()})
  }
  return res.json({error: "Invalid date"})
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
