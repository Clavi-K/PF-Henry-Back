const userModel = require("../models/user.model")

module.exports = async (req, res, next) => {

    if (req.headers.user && await userModel.existsByUid(req.headers.user)) {
        req.userId = req.headers.user
        return next()
    }
    return res.redirect(process.env.CLIENTURL)
}