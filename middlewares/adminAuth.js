const logger = require("../utils/logger")
const roleService = require("../services/role.service")

class AuthAdminMiddleware {

    async adminAuth(req, res, next) {

        try {

            const role = await roleService.getById(req.user.uid)

            if (role.role === "ADMIN") {
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

module.exports = new AuthAdminMiddleware().adminAuth