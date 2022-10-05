/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class RoomModel {

    constructor() {

        const schema = new Schema({
            number: Number,
            rows: Number,
            columns: Number,
            deleted: { type: Boolean, default: false }
        })

        this.model = model('rooms', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        const room = await this.model.create(obj)
        return room
    }

    async getAll() {
        const rooms = await this.model.find({ deleted: false })
        return rooms
    }

    async getById(id) {
        const room = await this.model.findById(id)
        return room
    }

    async logicDelete(id) {
        await this.model.updateOne({ _id: id }, { deleted: true }, { upsert: false })
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new RoomModel()

/* ========== */