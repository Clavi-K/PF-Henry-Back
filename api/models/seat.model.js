/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class SeatModel {

    constructor() {

        const schema = new Schema({
            taken: Boolean,
            occupant: String
        })

        this.model = model("seats", schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new SeatModel()

/* ========== */