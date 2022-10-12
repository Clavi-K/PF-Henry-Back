const admin = require("firebase-admin")
const config = require("./index")

admin.initializeApp({
    credential: admin.credential.cert(config.gooelAuth)
})

module.exports = admin