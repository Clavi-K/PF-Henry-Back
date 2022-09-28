/* ===== REQUIRED IMPORTS ===== */

const service = require('../services/review.service.js')

/* ========== */

/* ===== EXPORT CONTROLLER ===== */

module.exports = {

    post: async(req,res,next) =>{
    const newReview = req.body;
try{
    const result = await service.post(newReview)
    return res.status(201).send(result)

}catch(error){
    next(error);
}
    },


getAll: async (req, res, next) => {

    try {

        const reviews = await service.getAll()
        return res.status(200).send(reviews)

    } catch (e) {
        next(e)
    }

}
}

/* ========== */