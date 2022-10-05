/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")
const bcrypt = require('bcrypt')
const logger = require("../utils/logger")

/* ========== */

/* ===== DATABASE MODEL ===== */

class UserModel {

    constructor() {

        const schema = new Schema({
            email: String,
            password: String,
            firstname: String,
            lastname: String,
            username: String,
            role: String,
            avatar: String,
            reservations: { type: [String], default: [] },
            deleted: { type: Boolean, default: false }
        })

        this.model = model('users', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        if (obj.password) obj.password = await bcrypt.hash(obj.password, 10)
        obj.role = "USER"
    
        const user = await this.model.create(obj)
        return user
    }

    async existsByEmail(email) {
        return this.model.exists({ email })
    }

    async getByEmail(email) {
        const user = await this.model.findOne({ email }).lean()
        return user
    }

    async isPasswordValid(email, password) {
        const user = await this.model.findOne({ email }).lean()
        if (!user.password) return false
        return bcrypt.compare(password, user.password)
    }

    async getById(id) {
        const user = await this.model.findById(id).lean()
        return user
    }

    async findOrCreateByEmail(email, obj) {
        const user = await this.model.findOneAndUpdate({ email }, obj, { upsert: true, new: true }).lean()
        return user
    }

    /* ========== */
}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new UserModel()

/* ========== */