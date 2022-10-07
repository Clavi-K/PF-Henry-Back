/* ===== REQUIRED IMPORTS ===== */

const { Schema, model, Types } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class ShowtimeModel {

    constructor() {

        const schema = new Schema({
            movieId: Number,
            movieTitle: String,
            image: String,
            dateTime: Date,
            roomId: String,
            format: String,
            seats: { type: [[String]], default: [[]] },
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('showtimes', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        const result = await this.model.create(obj)
        return result
    }

    async getAll() {
        const showtimes = await this.model.find({ deleted: false }).lean()
        return showtimes
    }

    async getById(id) {
        const showtime = await this.model.findById(id)
        return showtime
    }

    async getByMovie(movieId) {
        const showtimes = await this.model.find({movieId, deleted: false}).lean()
        return showtimes
    }

    async update(obj) {
        const updated = await this.model.updateOne({ _id: obj._id }, obj, { new: true, upsert: false })
        return updated
    }

    async getByRoomId(roomId) {
        const showtimes = await this.model.find({roomId, deleted: false}).lean()
        return showtimes
    }

    async loigcDelete(id) {
        await this.model.updateOne({ _id: id }, { deleted: true })
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ShowtimeModel()

/* ========== */