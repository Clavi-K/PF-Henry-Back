/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/review.model.js");
const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {
  post: async (obj) => {
    if (!obj.movieId) {
      throw new Error("Missing movie ID");
    }

    if (!obj.userId) {
      throw new Error("Missing user ID");
    }

    if (!obj.description) {
      throw new Error("Missing description");
    }

    if (!obj.stars) {
      throw new Error("Missing stars");
    }

    try {
      return await model.save(obj);
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  },

  getAll: async () => {
    try {
      return await model.getAll();
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  },
};

/* ========== */
