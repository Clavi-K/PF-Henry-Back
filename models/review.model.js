/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose");

/* ========== */

/* ===== DATABASE MODEL ===== */

class ReviewModel {
  constructor() {
    const schema = new Schema(
      {
        userId: String,
        movieId: Number,
        stars: Number,
        description: String,
        deleted: { type: Boolean, default: false },
      },
      { versionKey: false }
    );

    this.model = model("reviews", schema);
  }

  /* ===== MODEL METHODS ===== */
  async save(obj) {
    const result = await this.model.create(obj);
    return result;
  }

  async getAll() {
    const reviews = await this.model.find({}).lean();
    return reviews;
  }
}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new ReviewModel();

/* ========== */
