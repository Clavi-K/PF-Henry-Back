const admin = require("../config/firebase-config")
const logger = require("../utils/logger")

class AuthMiddleware {

    async decodeToken(req, res, next) {
        const token = req.headers.user

        try {

            const decodeValue = await admin.auth().verifyIdToken(token)

            if (decodeValue) {
                req.user = decodeValue
                next()
            } else {
                res.redirect(process.env.DEPLOYCLIENTURL)
            }

        } catch (e) {
            logger.log(e)
            next(e)
        }

    }

}

module.exports = new AuthMiddleware().decodeToken