const express = require("express");
const { basic, adminOnly } = require("./auth");
const UserSchema = require("./schema");
const q2m = require("query-to-mongo");
const authenticate = require("./authTools");



const usersRouter = express.Router()

usersRouter.get("/me", basic, async (req, res, next) =>{
    try {
        res.send(req.user)
    } catch (error) {
        next("user not found")
    }
})

usersRouter.get("/", basic, adminOnly, async (req, res, next) => {
    try {
      const query = q2m(req.query)
  
      const users = await UserSchema.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)
  
      res.send({
        data: users,
        total: users.length,
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
usersRouter.post("/", async(req, res, next) => {
    try {
        const newUser = new UserSchema(req.body)
        const { _id } = await newUser.save()

        res.status(200).send(_id)
    } catch (error) {
        next(error)        
    }
})

usersRouter.put("/me", basic, async (req, res, next) => {
    try {
      const updates = Object.keys(req.body)
  
      try {
        updates.forEach((update) => (req.user[update] = req.body[update]))
        await req.user.save()
        res.send(req.user)
      } catch (e) {
        res.status(400).send(e)
      }
    } catch (error) {
      next(error)
    }
  })
  
  usersRouter.delete("/me", basic, async (req, res, next) => {
    try {
      await req.user.remove()
      res.send("Deleted")
    } catch (error) {
      next(error)
    }
  })

  usersRouter.post('/login', async (req, res, next) => {
      try {
          const { username, password } = req.body
          const user = await UserSchema.findByCredentials(username, password)
          console.log(user)
          //generate token
          const token = await authenticate(user)
          console.log(token)
          res.send(token)
      } catch (error) {
          console.log(error)
      }
  })

module.exports = usersRouter;