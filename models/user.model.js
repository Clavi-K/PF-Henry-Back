/* ===== REQUIRED IMPORTS ===== */

const { Schema, Types, model } = require("mongoose")
const bcrypt = require('bcrypt')

/* ========== */

/* ===== DATABASE MODEL ===== */

class UserModel {

    constructor() {

        const schema = new Schema({
            email: { type: String, unique: true },
            uid: { type: String, unique: true },
            displayName: String,
            role: String,
            avatar: String,
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('users', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        obj.role = "USER"

        const user = await this.model.create(obj)
        return user
    }

    async getAll() {
        const users = await this.model.find({ deleted: false }).lean()
        return users
    }

    async existsByEmail(email) {
        return await this.model.exists({ email })
    }

    async existsByUid(uid) {
        return await this.model.exists({ uid })
    }

    async getByEmail(email) {
        const user = await this.model.findOne({ email }).lean()
        return user
    }

    async getById(uid) {
        const user = await this.model.findOne({ uid }).lean()
        return user
    }

    async findOrCreateByEmail(email, obj) {
        const user = await this.model.findOneAndUpdate({ email }, obj, { upsert: true, new: true }).lean()
        return user
    }

    async logicDelete(uid) {
        await this.model.updateOne({ uid }, { deleted: true })
    }

    /* ========== */
}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new UserModel()

/* ========== */