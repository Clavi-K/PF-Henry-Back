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
            showtimeId: { type: String, require: true },
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
        const updated = await this.model.updateOne({ _id: seatId }, { userId }, { new: true, upsert: false })
        return updated
    }

    async clearRoom(showtimeId) {
        await this.model.updateMany({ showtimeId }, { userId: "", showtimeId: "" }, { new: true, upsert: false })
    }

    async logicDelete(id) {
        await this.model.updateOne({ _id: id }, { deleted: true }, { upsert: false })
    }

    async hardDelete(showtimeId) {
        await this.model.deleteMany({ showtimeId })
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new SeatModel()

/* ========== */