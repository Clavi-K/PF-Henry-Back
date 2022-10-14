/* ===== REQUIRED IMPORTS ===== */

const apiService = require("./api.service")
const subscriptionService = require("./subscription.service")
const reservationService = require("./reservation.service")
const model = require("../models/review.model.js");
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
    if (!movieTest.title) {
      throw new Error("Missing or invalid movie ID");
    }

    if (!obj.description || typeof obj.description !== "string" || obj.description.trim(" ").length === 0) {
      throw new Error("Missing description");
    }

    if (!obj.stars || isNaN(Number(obj.stars) || obj.stars < 1)) {
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

  getByMovie: async (movieId) => {

    if (!movieId || isNaN(Number(movieId))) {
      throw new Error("Invalid movie ID")
    }

    try {
      return await model.getByMovie(movieId)
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  },

  postWebsite: async (obj) => {

    if (!obj.userId || typeof obj.userId !== "string" || obj.userId.trim(" ").length === 0) {
      throw new Error("Missing  or invalid user ID");
    }

    if (obj.movieId) {
      throw new Error("Invalid website review: It can't contain a movie ID");
    }

    if (!obj.description || typeof obj.description !== "string" || obj.description.trim(" ").length === 0) {
      throw new Error("Missing description");
    }

    if (!obj.stars || isNaN(Number(obj.stars) || obj.stars < 1)) {
      throw new Error("Missing stars");
    }

    obj.type = "WEBSITE"

    try {

      const userPayedReservations = await reservationService.getPayedByUser(obj.userId)

      if(userPayedReservations.length || await subscriptionService.hasActiveSubscription(obj.userId)) {
        return await model.save(obj) 
      } else {
        throw new Error("You need to confirm a reservation or subscribe in order to post a webiste review!")
      }

    } catch(e) {
      logger.error(e)
      throw new Error(e)
    }

  },

  getAllWebsite: async() => {

    try {

      const reviews = await model.getAllWebsite()
      return reviews

    } catch(e) {
      logger.error(e)
      throw new Error(e)
    }

  }

};

/* ========== */
