/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/review.model.js");
const apiService = require("../services/api.service")
const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

  post: async (obj) => {

    if (!obj.userId || typeof obj.userId !== "string") {
      throw new Error("Missing  or invalid user ID");
    }

    if (!obj.movieId || isNaN(Number(obj.movieId))) {
      throw new Error("Missing or invalid movie ID");
    }
    
    const movieTest = await apiService.getMovie(obj.movieId)
    if(!movieTest.title) {
      throw new Error("Missing or invalid movie ID");
    }

    if (!obj.description || typeof obj.description !== "string" || obj.description.trim(" ").length === 0) {
      throw new Error("Missing description");
    }

    if (!obj.stars || isNaN(Number(obj.stars))) {
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
