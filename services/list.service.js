/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/list.model")
const userService = require("./user.service")
const apiService = require("./api.service")
const logger = require("../utils/logger")

/* ========== */

module.exports = {

    post: async (obj) => {

        if (!obj.userId || typeof obj.userId !== "string") {
            throw new Error("Missing or invalid user ID")
        }

        if (!obj.name || typeof obj.name !== "string" || obj.name.trim(" ").length === 0) {
            throw new Error("Missing or invalid list name")
        }

        try {

            const user = await userService.getById(obj.userId)
            if (!user) {
                throw new Error("Invalid user")
            }

            return await model.save(obj)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getAll: async () => {
        try {
            const lists = await model.getAll()
            return lists
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }
    },

    getByUser: async (userId) => {

        if (!userId || typeof userId !== "string" || userId.trim(" ").length === 0) {
            throw new Error("Missing or invalid user ID")
        }

        try {

            const user = await userService.getById(userId)
            if (!user) {
                throw new Error("Invalid user ID")
            }

            const lists = await model.getByUser(userId)
            return lists

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    addMovie: async (listId, movieId) => {

        if (!listId || typeof listId !== "string" || listId.trim(" ").length === 0) {
            throw new Error("Missing or invalid list ID")
        }

        if (!movieId || typeof movieId !== "string" || movieId.trim(" ").length === 0) {
            throw new Error("Missing or invalid movie ID")
        }

        try {

            const list = await model.getById(listId)
            if (!list) {
                throw new Error("Invalid list ID")
            }

            const movie = await apiService.getMovie(movieId)
            if (!movie) {
                throw new Error("Invalid movie ID")
            }

            const newList = await model.addMovie(listId, movieId)
            return newList

        } catch (e) {
            throw new Error(e)
        }

    },

    removeMovie: async (listId, movieId) => {

        if (!listId || typeof listId !== "string" || listId.trim(" ").length === 0) {
            throw new Error("Missing or invalid list ID")
        }

        if (!movieId || typeof movieId !== "string" || movieId.trim(" ").length === 0) {
            throw new Error("Missing or invalid movie ID")
        }

        try {

            const list = await model.getById(listId)
            if (!list) {
                throw new Error("Invalid list ID")
            }

            const movie = await apiService.getMovie(movieId)
            if (!movie) {
                throw new Error("Invalid movie ID")
            }

            const newList = await model.removeMovie(listId, movieId)
            return newList

        } catch (e) {
            throw new Error(e)
        }
    }

}