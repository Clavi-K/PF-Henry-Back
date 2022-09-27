
const service = require('../services/api.service.js')

/* ===== EXPORT CONTROLLER ===== */

module.exports = {
    
    getAllPopular: async (req,res,next) => {

        try {
            const movies = await service.getAllPopular()
             res.status(200).send(movies)
             
            

        } catch(e) {
            //llama al middleware para manejar el error
            next(e)
        }

    }
    
}

/* ========== */