/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")
const bcrypt = require('bcrypt')

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
        obj.password = await bcrypt.hash(obj.password, 10)
        const user = await this.model.create(obj)

        return { ...user, _id: user._id.toString() }
    }

    async existsByEmail(email) {
        return this.model.exists({ email })
    }

    async getByEmail(email) {
        const user = await this.model.findOne({ email }).lean()
        return { ...user, _id: user._id.toString() }
    }

    async isPasswordValid(email, password) {
        const user = await this.model.findOne({ email }).lean()
        return bcrypt.compare(password, user.password)
    }

    async getById(id) {
        return await this.model.findById(id).lean();
    }

    /* ========== */
}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new UserModel()

/* ========== */