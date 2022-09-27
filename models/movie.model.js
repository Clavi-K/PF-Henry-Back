/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class MovieModel {

    constructor() {

        const schema = new Schema({
            _id: Number,
            title: String,
            summary: String,
            rating: Number,
            vote_count: Number,
            duration: Number,
            release_date: String,
            image: String,
            onCinema: {type: Boolean, default: true},
            genres: {type: [Number], default: []},
            deleted: { type: Boolean, default: false }
        })

        this.model = model('movies', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new MovieModel()

/* ========== */