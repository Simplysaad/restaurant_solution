/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema();

let User = mongoose.model("User", userSchema);
module.exports = User;
