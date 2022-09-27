const functions = require("../models/function.model");


module.exports={
postFunction: async( req,res,next )=>{
    const fn=req.body 

    try{
        const funcion = new functions.model(fn);
          console.log(funcion);
          await funcion.save();
        if(!funcion) return res.status(404).json({msg:'Failed to create a new function'})
          res.status(201).send(funcion)
    }
    catch(err){
        next(err)
    }
}

}