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
            functionId: String,
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

    async getByFunction(functionId) {
        const seats = this.model.find({ functionId, deleted: false }).lean()
        return seats
    }
    
    async getById(id){
        const result = await this.model.findById(id)
    }

    async setUserId(seatId, userId) {
        const seat = await this.model.updateOne({_id: seatId}, {userId})
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new SeatModel()

/* ========== */