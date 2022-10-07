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
            seatLocation: String,
            type: String,
            price: Number,
            payed: { type: Boolean, default: false },
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('reservations', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        const reservation = await this.model.create(obj)
        return reservation
    }

    async confirm(id) {
        await this.model.updateOne({ _id: id }, { payed: true }, { upsert: false })
    }

    async confirmByUser(userId) {
        await this.model.updateMany({ userId, payed: false }, { payed: true }, { upsert: false })
    }

    async getByUser(userId) {
        const reservations = await this.model.find({ userId, deleted: false }).lean()
        return reservations
    }

    async cancel(id) {
        await this.model.updateOne({ _id: id, deleted: false }, { deleted: true }, { upsert: false })
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ReservationModel()

/* ========== */