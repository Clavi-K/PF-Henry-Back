/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/subscription.model")
const logger = require("../utils/logger.js");

/* ========== */

/* ===== EXPORT SERVICE ===== */

module.exports = {

    save: async (obj) => {

        if (!obj.userId || typeof obj.userId !== "string" || obj.userId.trim(" ").length === 0) {
            throw new Error("Missing or invalid user ID")
        }

        if (!obj.price || isNaN(Number(obj.price))) {
            throw new Error("Mssing or invalid subscription price")
        }

        try {

            const sub = await model.getByUser(obj.userId)
            if (sub) {
                throw new Error("You are already subscribed!")
            }

            return await model.save({ userId: obj.userId, payments: [{ price: obj.price, dateTime: Date.now() }] })

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

            return await this.model.getByUser(userId)[0]

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    cancelSub: async (userId) => {

        if (!userId || typeof userId !== "string" || userId.trim(" ").length === 0) {
            throw new Error("Missing or invalid user ID")
        }

        try {

            const sub = await model.getByUser(userId)
            if (!sub) {
                throw new Error("Failed to cancel subscription, you are not subscribed!")
            }

            await model.logicDelete(userId)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    addPayment: async (userId, price) => {

        if (!userId || typeof userId !== "string" || userId.trim(" ").length === 0) {
            throw new Error("Missing or invalid user ID")
        }

        if (!price || isNaN(Number(price)) || price < 1) {
            throw new Error("Missing or invalid subscription price!")
        }

        try {

            const sub = await model.getByUser(userId)
            const lastPayment = sub.payments[sub.payments.length - 1]

            if (!activePayment(lastPayment.dateTime)) {
                sub.payments.push({ price, dateTime: Date.now() })
            } else {
                throw new Error("The last payment is still active!")
            }

            await model.addPayment(userId, sub.payments)

        } catch (e) {
            logger.error(e)
            throw new Error(e)
        }

    },

    hasActiveSubscription: async (userId) => {

        if (!userId || typeof userId !== "string" || userId.trim(" ").length === 0) {
            throw new Error("Missing or invalid user ID")
        }

        try {

            const sub = await model.getByUser(userId)
            if (!sub) {
                return false
            }

            return true

        } catch(e) {
            logger.error(e)
            throw new Error(e)
        }

    }

}

/* ========== */

/* ===== LOCAL FUNCTIONS ===== */

function activePayment(lastPayment) {

    const lastPaymentDate = new Date(lastPayment)
    console.log(lastPaymentDate)
    const dayInterval = Math.floor((lastPaymentDate.getTime() - new Date(Date.now()).getTime()) / (1000 * 60 * 60 * 24))

    return !dayInterval >= -30

}

/* ========== */