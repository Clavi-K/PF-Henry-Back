const Strategy = require('passport-local').Strategy

const userModel = require('../models/user.model')
const logger = require('../utils/logger')

module.exports = (passport) => {

    const authenticateUser = async (email, password, done) => {

        if (!await userModel.existsByEmail(email)) {
            return done(null, false, { message: "User does not exists!" })
        }

    }

}