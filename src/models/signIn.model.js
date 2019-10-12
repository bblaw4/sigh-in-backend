const mongoose = require("mongoose");
const schema = mongoose.Schema;

const signInSchema = new schema({
  date: { type: Date, default: Date.now },
  name: String,
  org: String,
  issue: String
});

module.exports = mongoose.model("SignIn", signInSchema);
