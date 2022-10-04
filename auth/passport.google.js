/* ===== REQUIRED IMPORTS ===== */

const GoogleStrategy = require('passport-google-oauth20').Strategy

const userModel = require('../models/user.model')
const config = require('../config')
const logger = require('../utils/logger')

/* ========== */

/* ===== EXPORT STRATEGY ===== */

module.exports = (passport) => {
    const auth = async (accessToken, refreshToken, profile, done) => {
        const user = {
            role: "USER",
            firstname: profile._json.given_name,
            lastname: profile._json.family_name,
            username: `${profile._json.given_name}${profile._json.family_name}`,
            email: profile._json.email
        }

        try {
            const result = await userModel.findOrCreateByEmail(user.email, user)
            return done(null, result)
        } catch (e) {
            logger.error(e)
            return done(e)
        }

    }

    passport.use("google", new GoogleStrategy({
        clientID: config.auth.GOOGLECLIENTID,
        clientSecret: config.auth.GOOGLESECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    }, auth))

    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        id = id.toString()
        done(null, await userModel.getById(id))
    })

}

/* ========== */