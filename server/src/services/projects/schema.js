const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const v = require("validator")


const projectSchema = new Schema({
  name: {
    type: String,    
    
  },
  description: {
    type: String,
  }, 
  student: {
    type: mongoose.Schema.Types.ObjectId, ref:'student',
  },  
})

const projectModel = mongoose.model("project", projectSchema)

module.exports = projectModel