/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class SubscriptionModel {

    constructor() {

        const schema = new Schema({
            userId: String,
            payments: { type: [Object], default: [] },
            deleted: { type: Boolean, default: false }
        }, { versionKey: false })

        this.model = model('subscriptions', schema)

    }

    /* ===== MODEL METHODS ===== */

    async save(obj) {
        return await this.model.create(obj)
    }

    async getByUser(userId) {
        return await this.model.findOne({ userId, deleted: false }).lean()
    }

    async getById(id) {
        return await this.model.findById(id)
    }

    async addPayment(userId, payments) {
        const sub = await this.model.findOne({ userId, deleted: false })
        sub.payments = payments

        await sub.save()
    }

    async logicDelete(userId) {
        await this.model.updateOne({ userId, deleted: false }, { deleted: true }, { upsert: false })
    }

    async getAll() {
        return await this.model.find({}).lean()
    }

    /* ========== */

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new SubscriptionModel()

/* ========== */