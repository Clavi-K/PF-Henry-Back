/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class RoleModel {

    constructor() {

        const schema = new Schema({
            userId: { type: String, require: true, unique: true },
            role: { type: String, default: "ADMIN" },
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('roles', schema)

    }

    async save(roleObj) {
        await this.model.create(roleObj)
    }

    async setAdminRole(userId) {
        const role = await this.model.findOne({ userId }).lean()
        role.role = "ADMIN"
        await role.save()
    }

    async setUserRole(userId) {
        const role = await this.model.findOne({ userId }).lean()
        role.role = "USER"

        await role.save()
    }

    async getById(userId) {
        return await this.model.findOne({ userId }).lean()
    }

}

module.exports = new RoleModel()