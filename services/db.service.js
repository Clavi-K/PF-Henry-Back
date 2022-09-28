/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/function.model.js")

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
            return await model.save(obj)
        } catch (e) {
            throw new Error(e)
        }

    }

}

/* ========== */

/* ===== LOCAL FUNCTIONS ===== */

function isValidDate(date) {
    const testDate = new Date(date)
    return testDate && Object.prototype.toString.call(testDate) === "[object Date]" && !isNaN(testDate);
}

/* ========== */