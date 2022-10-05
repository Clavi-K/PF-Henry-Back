/* ===== REQUIRED IMPORTS ===== */

const { Schema, Types, model } = require("mongoose")
const logger = require("../utils/logger")

/* ========== */

/* ===== DATABASE MODEL ===== */

class SeatModel {

    constructor() {

        const schema = new Schema({
            location: String,
            userId: String,
            showtimeId: String,
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('seats', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        const seat = await this.model.create(obj)
        return seat
    }

    async bulkSave(arrs) {
        const seats = []

        for (const arr of arrs) {
            seats.push(await this.model.create(arr))
        }

        return seats
    }

    async getByShowtime(showtimeId) {
        const seats = await this.model.find({ showtimeId, deleted: false }).lean()
        return seats
    }

    async getById(id) {
        const seat = await this.model.findById(id)
        return seat
    }

    async setUserId(seatId, userId) {
        const updated = await this.model.updateOne({ _id: seatId }, { userId }, { new: true })
        return updated
    }

    async logicDelete(id) {
        await this.model.updateOne({ _id: id }, { deleted: true })
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new SeatModel()

/* ========== */