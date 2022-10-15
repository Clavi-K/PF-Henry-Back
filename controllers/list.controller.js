/* ===== REQUIRED IMPORTS ===== */

const service = require("../services/list.service.js");

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    post: async (req, res, next) => {
        const newList = req.body

        try {
            const result = await service.post(newList)
            return res.status(201).send(result)

        } catch (e) {
            next(e)
        }

    },

    getByUser: async (req, res, next) => {

        try {
            const { uid } = req.user
            const lists = await service.getByUser(uid)
            return res.status(200).send(lists)

        } catch (e) {
            next(e)
        }
    },

    addMovie: async (req, res, next) => {
        const { listId, movieId } = req.params

        try {
            
            const result = await service.addMovie(listId, movieId)
            return res.status(200).send(result)

        } catch (e) {
            next(e)
        }

    },

    removeMovie: async (req, res, next) => {
        const { listId, movieId } = req.params

        try {
            const result = await service.removeMovie(listId, movieId)
            return res.status(200).send(result)

        } catch (e) {
            next(e)
        }

    },


    removeById: async (req, res, next) => {

        try {
            const { uid } = req.user
            const { listId } = req.params

            await service.removeById(uid, listId)
            return res.status(200).send("List removed successfully!")

        } catch (e) {
            next(e)
        }

    }

}

/* ========== */