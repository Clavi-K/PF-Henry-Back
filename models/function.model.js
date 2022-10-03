/* ===== REQUIRED IMPORTS ===== */

const { Schema, model, Types } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class FunctionModel {

    constructor() {

        const schema = new Schema({
            movieId: Number,
            movieTitle: String,
            image: String,
            dateTime: Date,
            roomId: String,
            format: String,
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

    async update(obj) {

        const original = await this.model.updateOne({ _id: Types.ObjectId(obj._id) }, obj)
        return original

    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new FunctionModel()

/* ========== */