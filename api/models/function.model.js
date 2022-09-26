/* ===== REQUIRED IMPORTS ===== */

const { Schema, model } = require("mongoose")

/* ========== */

/* ===== DATABASE MODEL ===== */

class FunctionModel {

    constructor() {

        const schema = new Schema({
            movie: String,
            dateTime: Date,
            room: String
        })

        this.model = model("functions", schema)

    }

}

/* ========== */

/* ===== MODEL EXPORT ===== */

module.exports = new FunctionModel()

/* ========== */