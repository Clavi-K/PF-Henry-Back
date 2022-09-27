const functions = require("../models/function.model");


module.exports={
postFunction: async( req,res,next )=>{
    const fn=req.body 

    try{
        const funcion = new functions.model(fn);
          console.log(funcion);
          await funcion.save();

          res.status(201).send(funcion)
    }
    catch(err){
        next(err)
    }
}

}