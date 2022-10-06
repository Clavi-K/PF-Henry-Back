const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy

const userModel = require("../models/user.model")
const logger = require("../utils/logger")
const config = require("../config")

module.exports = (passport) => {

    const authenticateUser = async (email, password, done) => {

        try {

            if (!await userModel.existsByEmail(email)) {
                return done(null, false, { message: "User does not exists!" })
            }

            if (!await userModel.isPasswordValid(email, password)) {
                return done(null, false, { message: "Incorrect password!" })
            }

            const user = await userModel.getByEmail(email)
            done(null, user)

        } catch (err) {
            logger.error(e)
            done(e)
        }

    }

    const googleAuth = async (accessToken, refreshToekn, profile, done) => {

        const user = {
            firstname: profile._json.given_name,
            lastname: profile._json.family_name,
            username: `${profile._json.given_name}${profile._json.family_name}`,
            email: profile._json.email
        }

        try {
            const result = await userModel.findOrCreateByEmail(user.email, user)
            done(null, result) 
        } catch(e) {
            logger.error(e)
            return done(e)
        }

    }

    passport.use("login", new LocalStrategy({ usernameField: "email" }, authenticateUser))
    passport.use("google", new GoogleStrategy({
        clientID: config.auth.GOOGLECLIENTID,
        clientSecret: config.auth.GOOGLESECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    }, googleAuth))


    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (id, done) => {
        id = id.toString()
        logger.log(id)
        done(null, await userModel.getUserSession(id));
    });

}
