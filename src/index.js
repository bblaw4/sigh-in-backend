const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const signin = require("./models/signIn.model");
const app = express();
const PORT = 8080;

// middleware
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://admin:Password1@ds147520.mlab.com:47520/wtr",
  { useNewUrlParser: true },
  function(err) {
    if (err) return console.log(err.error);
    console.log("Connected to DB");
  }
);

// Get all signed in customers
app.get("/", (req, res) => {
  signin
    .find()
    .then(customers => res.json(customers))
    .catch(e => console.log(e));
});

// Record user sign in
app.post("/signin", (req, res) => {
  const { n, o, i } = req.body;
  const newSignIn = new signin({ name: n, org: o, issue: i });
  newSignIn.save(function(err, saved) {
    if (err) return;
    res.json(saved);
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
