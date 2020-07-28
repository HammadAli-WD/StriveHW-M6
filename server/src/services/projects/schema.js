const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const v = require("validator")
const { student } = require("../student/schema");

const projectSchema = new Schema({
  name: {
    type: String,    
    
  },
  description: {
    type: String,
  },
  studentid: {
    type: Schema.Types.ObjectId,
    ref: "student",
    
  },
    
  
})

const projectModel = mongoose.model("project", projectSchema)

module.exports = projectModel