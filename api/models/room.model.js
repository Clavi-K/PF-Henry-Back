/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class RoomModel {

    constructor() {

        const schema = new Schema({
            capacity: Number,
            seats: { type: [String], default: [] }
        })

        this.model = model("rooms", schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new RoomModel()

/* ========== */