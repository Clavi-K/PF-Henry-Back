/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class ReservationModel {

    constructor() {

        const schema = new Schema({
            user: String,
            function: String,
            seat: Number,
            type: String,
            price: Number,
            payed: Boolean,
            deleted: {type: Boolean, default: false}
        })

        this.model = model('reservations', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ReservationModel()

/* ========== */