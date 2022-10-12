/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class EmailModel {

    constructor() {

        const schema = new Schema({
            email: { type: String, require: true, unique: true }
        }, { versionKey: false })

        this.model = model('emails', schema)

    }

    async save(emailObj) {
        await this.model.create(emailObj)
    }

    async getByEmail(email) {
        return await this.model.findOne({email})
    }

}

module.exports = new EmailModel()