const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy
const UserModel = require("./schema");
const { authenticate } = require("./authTools");

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "http://localhost:3001/users/googleRedirect"
        },
        async (accessToken, profile, done) => {
            
            const newUser = {
                googleId: profile.id,
                name: profile.name.givenName,
                surname: profile.name.familyName,
                email: profile.emails[0].value,
                role: "user",
                //refreshTokens: [],
              }
              console.log(newUser)
            try {
                const user = await UserModel.findOne({ googleId: profile.id })
                console.log(user)

                if (user) {
                    const token = await authenticate(user)
                    done(null, { user, token})
                } else {
                    createdUser = await UserModel.create(newUser)
                    const token = await authenticate(createdUser)
                    done(null, { user, token })
                }
            } catch (error) {
                console.log(error)
                done(error)
            }
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user)
  })
  
  passport.deserializeUser(function (user, done) {
    done(null, user)
  })