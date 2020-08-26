const JWT = require('jsonwebtoken');
const UserModel = require('./schema');

const authenticate = async (user) =>{
    try {
        console.log(user)
        const newToken = await generateJWT({ _id: user._id})
        //await user.save()
        return newToken        
    } catch (error) {
        console.log(error)
        throw new Error('Problem with Authentication')

    }
}

const generateJWT = (payload) => new Promise ((res, rej) => {
    JWT.sign(payload, process.env.JWT_SECRET,
        { expiresIn: '1 week'},
        (err, token) => {
            if (err) rej(err)
            res(token)
        } 
        )
})

const verifyJWT = (token) =>
new Promise((res, rej) =>{
    JWT.verify(token, process.env.JWT_SECRET,(err, verified)=>{
        if (err) rej(err)
        res(token)
    })
})

module.exports = authenticate