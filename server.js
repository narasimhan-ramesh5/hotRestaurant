// dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up express server
var server = express();
var PORT = process.env.PORT || 8800;

// Sets up the Express server to handle data parsing
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Data for tables
var tables = [
];

// Data for waitlist
var waitlist = [
];

// Routes:
server.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

server.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

server.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});


// Displays all tables
server.get("/api/tables", function (req, res) {
  return res.json(tables);
});

// Displays all tables
server.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});


//   CREATE NEW RESEVATION 


// Create New reservations - takes in JSON input
server.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newtable = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newtable.routeName = newtable.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  tables.push(newtable);

  res.json(newtable);
});



server.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
