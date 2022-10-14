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
        } catch(e){
            next(e)
        }

    }

}

/* ========== */