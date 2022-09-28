/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class FunctionModel {

    constructor() {

        const schema = new Schema({
            movieId: String,
            dateTime: Date,
            roomId: String,
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('functions', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        const result = await this.model.create(obj)
        return result
    }

    async getAll() {
        const functions = await this.model.find({}).lean()
        return functions
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new FunctionModel()

/* ========== */