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

    async getAll() {
        const lists = await this.model.find({deleted: false}).lean()
        return lists
    }

    async getByUser(userId) {
        const lists = await this.model.find({ userId, deleted: false }).lean()
        return lists
    }

    async getById(id) {
        return await this.model.findById(id)
    }

    async addMovie(listId, movieId) {
        const list = await this.model.findById(listId)
        list.moviesId.push(movieId)
        return await list.save()
    }

    async removeMovie(listId, movieId) {
        const list = await this.model.findById(listId)

        const newMovies = list.moviesId.filter(m => m != movieId)
        list.moviesId = newMovies

        return await list.save()
    }

    /* ========== */
}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ListModel()

/* ========== */