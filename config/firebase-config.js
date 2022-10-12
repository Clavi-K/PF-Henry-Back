const admin = require("firebase-admin")
const config = require("./index")

admin.initializeApp({
    credential: admin.credential.cert({...config.gooelAuth, private_key: config.gooelAuth.private_key.replace(/\\n/g, '\n')})
})

module.exports = admin