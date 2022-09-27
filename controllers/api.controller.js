
const service = require('../services/api.service.js')

/* ===== EXPORT CONTROLLER ===== */

module.exports = {
    
    getAllPopular: async (req, res) => {

        try {
            const movies = await service.getAllPopular()
            return res.status(200).send(movies)

        } catch(e) {
            console.log(e)
            res.status(400).send(e)
        }

    }
    
}

/* ========== */