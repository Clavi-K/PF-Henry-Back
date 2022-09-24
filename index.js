function laCajaDePandora(numero) {
    // proximamente escribiremos codigo aqui

    if(numero%2 === 0){
        return (numero >>> 0).toString(2)
    } else{
        return (numero >>> 0).toString(16)
    }
}


function martin(){
    return {edad: 20, nacionalidad: "Argentina"}
}


console.log(laCajaDePandora())