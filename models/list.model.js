/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class ListModel {

    constructor() {

        const schema = new Schema({
            userId: String,
            name: String,
            contributorsId: {type: [String], default: []},
            moviesId: {type: [Number], default: []},
            deleted: {type: Boolean, default: false}
        }, { versionKey: false })

        this.model = model('lists', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ListModel()

/* ========== */