/* ===== REQUIRED IMPORTS ===== */

const config = require('../config')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    login: async (req, res, next) => {
        try {
            if (req.user) return res.status(200).send(req.user)
            return res.status(403).send({ error: true, message: "Not authorized" })
        } catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try{
            req.logout()
            return res.redirect(`${config.auth.GOOGLECLIENTID}/login`)
        } catch(e){
            next(e)
        }
    }

}

/* ========== */