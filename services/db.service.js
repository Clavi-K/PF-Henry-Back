/* ===== REQUIRED IMPORTS ===== */

const functionModel = require("../models/function.model.js")
const logger = require("../utils/logger.js")

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    postFunction: async (obj) => {

        if (!obj.movieId) {
            throw new Error("Missing movie ID")
        }

        if (!obj.room) {
            throw new Error("Missing room ID")
        }

        if (!isValidDate(obj.dateTime)) {
            throw new Error("Invalid function date")
        }

        try {
            return await functionModel.save(obj)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    getAllFunctions: async () => {

        try {
            return await functionModel.getAll()
        } catch(e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    updateFunction: async (obj) => {

        if (!obj._id) {
            throw new Error("Missing function ID")
        }

        if (!obj.movieId) {
            throw new Error("Missing movie ID")
        }

        if (!obj.room) {
            throw new Error("Missing room ID")
        }

        if (!isValidDate(obj.dateTime)) {
            throw new Error("Invalid function date")
        }

        try {
            return await functionModel.update(obj)
        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

}

/* ========== */

/* ===== LOCAL FUNCTIONS ===== */

function isValidDate(date) {
    const testDate = new Date(date)
    return testDate && Object.prototype.toString.call(testDate) === "[object Date]" && !isNaN(testDate);
}

/* ========== */