/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class ReviewModel {

    constructor() {

        const schema = new Schema({
            userId: String,
            movieId: String,
            stars: Number,
            description: String,
            deleted: {type: Boolean, default: false}
        })

        this.model = model('reviews', schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ReviewModel()

/* ========== */