/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class FunctionModel {

    constructor() {

        const schema = new Schema({
            movieId: String,
            dateTime: Date,
            room: String,
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('functions', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new FunctionModel()

/* ========== */