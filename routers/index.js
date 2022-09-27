const express = require("express");
//Se importan todas las rutas
const ApiRouter= require("./api.router.js")



const router = express.Router();


//Se definen las rutas base 
router.use('/api', ApiRouter)// ejemplo:http://localhost:8082/api/popular



//Por si se ingresa una ruta no definida previamente
router.use("*/*", (req, res) => {
    try {
      res.status(404).send(`This page doesn't exists`);
    } catch (error) {
      next(error)
    }
  });
  
  module.exports = router;