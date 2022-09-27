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
            moviesId: {type: [String], default: []},
            deleted: {type: Boolean, default: false}
        })

        this.model = model('lists', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ListModel()

/* ========== */