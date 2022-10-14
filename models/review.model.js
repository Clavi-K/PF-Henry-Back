/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose");
const logger = require("../utils/logger");

/* ========== */

/* ===== DATABASE MODEL ===== */

class ReviewModel {
  constructor() {
    const schema = new Schema({
      userId: String,
      username: String,
      movieId: Number,
      type: { type: String, default: "MOVIE" },
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
    return await this.model.find({ deleted: false, type: "MOVIE" }).lean()
  }

  async getAllWebsite() {
    return await this.model.find({ deleted: false, type: "WEBSITE" }).lean()
  }

  async getByMovie(movieId) {
    const reviews = await this.model.find({ movieId, deleted: false, type: "MOVIE" }).lean()
    return reviews
  }

  /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ReviewModel();

/* ========== */
