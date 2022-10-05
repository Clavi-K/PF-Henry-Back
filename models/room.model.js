/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class RoomModel {

    constructor() {

        const schema = new Schema({
            number: Number,
            capacity: Number,
            deleted: {type: Boolean, default: false}
        })

        this.model = model('rooms', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new RoomModel()

/* ========== */