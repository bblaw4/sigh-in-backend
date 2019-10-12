const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const signin = require("./models/signIn.model");
const app = express();
const PORT = 8080;

require("dotenv").config();
// middleware
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
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
