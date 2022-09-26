/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class ListModel {

    constructor() {

        const schema = new Schema({
            author: String,
            name: String,
            contributors: {type: [String], default: []},
            movies: {type: [String], default: []},
            deleted: {type: Boolean, default: false}
        })

        this.model = model("lists", schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ListModel()

/* ========== */