/* ===== REQUIRED IMPORTS ===== */

const {Schema, model} = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class UserModel {

    constructor() {

        const schema = new Schema({
            firstname: String,
            lastname: String,
            email: String,
            username: String,
            password: String,
            reservations: {type: [String], default: []}
        })

        this.model = model("users", schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */ 

module.exports = new UserModel()

/* ========== */