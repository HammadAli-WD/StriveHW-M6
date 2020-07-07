const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
   
  },
  country: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("student", studentSchema)