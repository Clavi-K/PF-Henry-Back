/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class SubscriptionModel {

    constructor() {

        const schema = new Schema({
            user: String,
            price: Number,
            startedAt: Date,
            deleted: { type: Boolean, default: false }
        })

        this.model = model("subscriptions", schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new SubscriptionModel()

/* ========== */