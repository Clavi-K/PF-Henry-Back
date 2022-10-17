/* ===== REQUIRED IMPORTS ===== */

const service = require('../services/subscription.service.js')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    subscribe: async (req, res, next) => {

        try {

            const sub = req.body
            const newSub = await service.save({ ...sub, userId: req.user.uid })

            return res.status(201).send(newSub)

        } catch (e) {
            next(e)
        }

    },

    addPayment: async (req, res, next) => {

        try {

            const { price } = req.body
            const { uid } = req.user

            await service.addPayment(uid, price)
            return res.status(200).send("New payment added successfully!")

        } catch (e) {
            next(e)
        }
    },

    cancelPayment: async (req, res, next) => {

        try {
            const { uid } = req.user
            await service.cancelSub(uid)

            return res.status(200).send("Subscription cancelled successfully!")
        } catch (e) {
            next(e)
        }

    },

    hasActiveSubscription: async (req, res, next) => {

        try {

            const { uid } = req.user

            const bool = await service.hasActiveSubscription(uid)
            return res.status(200).send(bool)

        } catch (e) {
            next(e)
        }

    },

    getByUser: async (req, res, next) => {

        try {
            const {uid} = req.user

            const sub = await service.getByUser(uid)
            return res.status(200).send(sub)
        } catch(e) {
            next(e)
        }

    },

    getAll: async(req,res,next) => {

        try {

            const result = await service.getAll()
            return res.status(200).send(result)
        } catch(e) {
            next(e)
        }

    }

}

/* ========== */