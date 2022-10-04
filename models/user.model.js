/* ===== REQUIRED IMPORTS ===== */

const {Schema, model} = require("mongoose")
const bcrypt = require('bcrypt')

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
            role: String,
            avatar: String,
            reservations: {type: [String], default: []},
            deleted: {type: Boolean, default: false}
        })

        this.model = model('users', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        obj.password
    }

    /* ========== */
}

/* ========== */

/* ===== MODEL EXPORT ===== */ 

module.exports = new UserModel()

/* ========== */