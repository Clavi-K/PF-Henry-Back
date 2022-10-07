/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class ListModel {

    constructor() {

        const schema = new Schema({
            userId: String,
            name: String,
            contributorsId: { type: [String], default: [] },
            moviesId: { type: [Number], default: [] },
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('lists', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        const list = await this.model.create(obj)
        return list
    }

    async getByUser(userId) {
        const lists = await this.model.find({ userId }).lean()
        return lists
    }

    async addMovie(listId, movieId) {
        const list = await this.model.findById(listId)
        list.moviesId.push(movieId)
        return await list.save()
    }

    /* ========== */
}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ListModel()

/* ========== */