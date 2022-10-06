/* ===== REQUIRED IMPORTS ===== */

const model = require("../models/list.model")
const userService = require("./user.service")
const logger = require("../utils/logger")

/* ========== */

module.exports = {

    post: async (obj) => {

        if (!obj.userId || typeof userId !== "string") {
            throw new Error("Missing or invalid user ID")
        }
        
        if (!obj.name || typeof name !== "string" || obj.name.trim(" ".length === 0)) {
            throw new Error("Missing or list name")
        }
        
        try {
            
            const user = await userService.getById(obj.userId)
            if(!user) {
                throw new Error("Invalid user")
            }

            return  await model.save(obj)
        } catch(e){
            logger.error(e)
            throw new Error(e)
        }

    }

}