const UserModel = require("./schema");
const {verifyJWT} = require('./authTools')

const authorize = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "")
  
      const decoded = await verifyJWT(token)
      console.log('here',decoded)
      const user = await UserModel.findOne({
        _id: decoded._id,
      })
      console.log(decoded)
      if (!user) {
        throw new Error()
      }
  
      //req.token = token
      req.user = user
      next()
    } catch (e) {
      console.log(e)
      const err = new Error("Please authenticate")
      err.httpStatusCode = 401
      next(err)
    }
  }

/* const jwtMiddleware = async (req, res, next) =>{
    try {
        const token = req.header("Authorization").replace("Bearer ", "")

        const decoded = await verifyJWT(token)
        console.log(decoded)

        const user = await UserModel.findOne({ _id: decoded._id})
        if(!user) throw new Error("User not found")

        req.user = user
        next()

    } catch (error) {
        next()
    }
} */

const adminOnlyMiddleware = async (req, res, next) => {
    if (req.user && req.user.role === "admin") 
    next()
    else {
        const err = new Error("Only Admins")
        err.httpStatusCode = 403
        next(err)
    }
}

module.exports = {
    authorize: authorize,
    adminOnly: adminOnlyMiddleware
}