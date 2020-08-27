const express = require("express")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")

const server = express()

//const booksRouter = require("./services/books")
const studentRouter = require("./services/student")
const projectsRouter = require("./services/projects")
const usersRouter = require("./services/users")

// initialization of oauth and cookies
const authRouter = require("./services/users/oauth")
const cookieParser = require("cookie-parser")
const passport = require("passport")

/* const whitelist = ["http://localhost:3001"]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
} */

server.use(cookieParser());
server.use(cors());



const {
  notFoundHandler,
  forbiddenHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandler")
// ERROR HANDLERS MIDDLEWARES
server.use(badRequestHandler)
server.use(forbiddenHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)



const port = process.env.PORT || 3000

const staticFolderPath = join(__dirname, "../public")
server.use(express.static(staticFolderPath))
server.use(express.json())

server.use(cors())

server.use("/projects", projectsRouter)
server.use("/student", studentRouter)
server.use("/users", usersRouter)




console.log(listEndpoints(server))

mongoose
  .connect("mongodb://localhost:27017/studentRecords", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port)
    })
  )
  .catch((err) => console.log(err))