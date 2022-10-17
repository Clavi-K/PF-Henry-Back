/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class ReservationModel {

    constructor() {

        const schema = new Schema({
            userId: String,
            showtimeId: String,
            type: String,
            price: Number,
            movieTitle: String,
            seatLocations: [String],
            ticketAmount: { type: Number, require: true },
            payedAt: { type: Date, default: undefined },
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
        await this.model.updateOne({ _id: id, deleted: false }, { payed: true, payedAt: Date.now() }, { upsert: false })
    }

    async confirmByUser(userId) {
        await this.model.updateMany({ userId, payed: false, deleted: false }, { payed: true, payedAt: Date.now() }, { upsert: false })
    }

    async getByUser(userId) {
        const reservations = await this.model.find({ userId, deleted: false, payed: false }).lean()
        return reservations
    }

    async getDeletedByUser(userId) {
        const reservations = await this.model.find({ userId, deleted: true })
        return reservations
    }

    async getById(id) {
        return await this.model.findById(id)
    }

    async cancelById(id) {
        await this.model.updateOne({ _id: id, deleted: false, payed: false }, { deleted: true }, { upsert: false })
    }

    async setUserSeats(reservationId, seatLocations) {
        const reservation = await this.model.findById(reservationId)
        reservation.seatLocations = seatLocations

        await reservation.save()
        return reservation
    }

    async getPayedByUser(userId) {
        const reservations = await this.model.find({ userId, payed: true }).lean()
        return reservations
    }

    async getByShowtimeId(showtimeId) {
        const reservations = await this.model.find({ showtimeId, deleted: false })
        return reservations
    }

    async deleteByShowtimeId(showtimeId) {
        await this.model.updateMany({ showtimeId }, { deleted: true }, { upsert: false })
    }

    async getRepeated(userId, showtimeId) {
        const reservations = await this.model.find({ userId, showtimeId }).lean()
        return reservations
    }

    async deleteByUser(userId) {
        await this.model.updateMany({ userId, payed: false }, { deleted: true }, { upsert: false })
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ReservationModel()

/* ========== */