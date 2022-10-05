/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose");
const logger = require("../utils/logger");

/* ========== */

/* ===== DATABASE MODEL ===== */

class ReviewModel {
  constructor() {
    const schema = new Schema({
      userId: String,
      movieId: Number,
      stars: Number,
      description: String,
      deleted: { type: Boolean, default: false },
    }, { versionKey: false });

    this.model = model("reviews", schema);
    
  }

  /* ===== MODEL METHODS ===== */

  async save(obj) {
    const result = await this.model.create(obj);
    return result;
  }

  async getAll() {
    const reviews = await this.model.find({deleted: false}).lean()
    return reviews
  }

  async getByMovie(movieId) {
    const reviews = await this.model.find({ movieId }).lean()
    return reviews
  }

  /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ReviewModel();

/* ========== */
