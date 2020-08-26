const UserModel = require("./schema");
const atob = require("atob");

/* with basic auth the header will contain:
Basic 12d981h933298hc389=
So the first split takes "the second part"
12d981h933298hc389=
Then it converts from base64 */
const basicAuthMiddleware = async (req, res, next) => {
    if( !req.headers.authorization) {
        const error = new Error("please provide a basic autentication")
        error.httpStatusCode = 401
        next(error)
    } else {
        const [username, password] = atob(
            req.headers.authorization.split(" ")[1]
        ).split(":")
        const user = await UserModel.findByCredentials(username, password)
        if(!user) {
            const error = new Error("Unable to login")
            error.httpStatusCode = 401
            next(error)
        } else {
            req.user = user

            next()
        }
    }
}

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
    basic: basicAuthMiddleware,
    adminOnly: adminOnlyMiddleware
}