/* ===== REQUIRED IMPORTS ===== */

const config = require('../config')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    login: async (req, res, next) => {
        console.log(req.user)
        try {
            if (req.user) return res.status(200).send(req.user)
            return res.status(403).send({ error: true, message: "Not authorized" })
        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        req.logout((e) => {
            if (e) return next(e)
            return res.redirect(`${config.auth.CLIENTURL}/login`)
        })
    }

}

/* ========== */