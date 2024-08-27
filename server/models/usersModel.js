const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    createOn: { type: Date, default: new Date().getTime() },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", userSchema);
