const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const v = require("validator")
const bcrypt = require("bcryptjs")

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            //required: true,
            //minlength: 7,
        },       
        role: {
            type: String,
            enum: ["admin", "user"],
            required: true
        },
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
            unique: true,
            validate: {
              validator: async (value) => {
                if (!v.isEmail(value)) {
                  throw new Error("Email is invalid")
                }
              },
            },
          },    
        googleId: String,
    }
)
//https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// instance methods required to build objects from the class and then use it while static methods can be used directly on class like here model
UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await UserModel.findOne({ username })

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch) return user
        else return null
    } else return null
}

UserSchema.pre("save", async function (next){
    const user = this
    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
// this function is for put method to hide the password 
//https://medium.com/@contactsunny/hide-properties-of-mongoose-objects-in-node-js-json-responses-a5437a5dbec2#:~:text=toJSON()%20method%20on%20the,to%20return%20in%20the%20response.&text=toJSON%20%3D%20function()%20%7B-,var%20obj%20%3D%20this.,delete%20obj.
UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
  
    delete userObject.password
    delete userObject.__v
  
    return userObject
  }
  
const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel