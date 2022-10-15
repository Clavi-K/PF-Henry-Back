/* ===== REQUIRED IMPORTS ===== */

const service = require("../services/review.service.js");

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {
  post: async (req, res, next) => {
    const { uid } = req.user

    const newReview = req.body;
    newReview.userId = uid

    try {

      const result = await service.post(newReview);
      return res.status(201).send(result);

    } catch (error) {
      next(error);
    }

  },

  getAll: async (req, res, next) => {

    try {

      const reviews = await service.getAll();
      return res.status(200).send(reviews);

    } catch (e) {
      next(e);
    }
  },

  getByMovie: async (req, res, next) => {
    const { movieId } = req.params

    try {

      const reviews = await service.getByMovie(movieId)
      return res.status(200).send(reviews)

    } catch (e) {
      next(e)
    }
  },

  postWebiste: async (req, res, next) => {
    const { uid } = req.user

    const newReview = req.body;
    newReview.userId = uid

    console.log(newReview)

    try {

      const result = await service.postWebsite(newReview)

      return res.status(201).send(result)

    } catch (e) {
      next(e)
    }

  },

  getAllWebsite: async(req, res, next) => {

    try {

      const reviews = await service.getAllWebsite()
      return res.status(200).send(reviews)

    } catch(e) {
      next(e)
    }

  }

};

/* ========== */
