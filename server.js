const express = require("express");
const {
  fetchUsers,
  addSchedule,
  fetchFacility,
  fetchShifts,
} = require("./api/facility/facility.controller");
var bodyParser = require("body-parser");
const cors = require('cors');



// Next initialize the application
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// parse application/json
app.use(bodyParser.json());

// routing path
app.post("/", async (req, res) => {
  const response = await addSchedule(req);
  res.send(response);
});

app.get("/users", async (req, res) => {
  const response = await fetchUsers(req);
  res.send(response);
});

app.get("/facility", async (req, res) => {
  const response = await fetchFacility(req);
  res.send(response);
});

app.get("/shifts", async (req, res) => {
  const response = await fetchShifts(req);
  res.send(response);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
