/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class ReservationModel {

    constructor() {

        const schema = new Schema({
            userId: String,
            showtimeId: String,
            seatId: String,
            type: String,
            price: Number,
            payed: Boolean,
            deleted: {type: Boolean, default: false}
        }, { versionKey: false })

        this.model = model('reservations', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ReservationModel()

/* ========== */