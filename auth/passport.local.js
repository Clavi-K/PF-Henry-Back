/* ===== REQUIRED IMPORTS ===== */

const Strategy = require('passport-local').Strategy

const userModel = require('../models/user.model')
const logger = require('../utils/logger')

/* ========== */

/* ===== EXPORT STRATEGY ===== */

module.exports = (passport) => {

    const authenticateUser = async (email, password, done) => {

        if (!await userModel.existsByEmail(email)) {
            return done(null, false, { message: "User does not exists!" })
        }

        if (!await userModel.isPasswordValid(email, password)) {
            return done(null, false, { message: "Incorrect password!" })
        }

        try {
            const user = await userModel.getByEmail(email)

            if (!user.password) {
                return done(null, false, { message: "Google Acount User (Has no password)" })
            } else {
                return done(null, user)
            }

        } catch (e) {
            logger.error(e)
            return done(e)
        }

    }

    const registerUser = async (req, email, password, done) => {

        const { firstname, lastname, username, avatar, password2 } = req.body

        if (await userModel.existsByEmail(email)) {
            return done(null, false, { message: "User already exists!" })
        }

        if (password !== password2) {
            return done(null, false, { message: "Passwords dont match!" })
        }

        if (!firstname || typeof firstname !== "string" || firstname.trim(" ").length === 0) {
            return done(null, false, { message: "First name not valid!" })
        }

        if (!lastname || typeof lastname !== "string" || lastname.trim(" ").length === 0) {
            return done(null, false, { message: "Last name not valid!" })
        }

        if (!username || typeof username !== "string" || username.trim(" ").length === 0) {
            return done(null, false, { message: "User name not valid!" })
        }

        try {

            const user = await userModel.save({
                email,
                password,
                firstname,
                lastname,
                username,
            })

            return done(null, user)

        } catch (e) {
            logger.error(e)
            done(e)
        }

    }

    passport.use("login", new Strategy({ usernameField: "email" }, authenticateUser))
    passport.use("register", new Strategy({ usernameField: "email", passReqToCallback: true }, registerUser))

    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        id = id.toString()
        done(null, await userModel.getById(id));
    });

}

/* ========== */