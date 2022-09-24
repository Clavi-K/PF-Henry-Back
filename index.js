function laCajaDePandora(numero) {
    // proximamente escribiremos codigo aqui
    if (numero%0){
        return (numero >>> 0).toString(2)
    }
    else {
        return (numero >>> 0).toString(16)
    }
}

/* En el mismo archivo index.js debes crear una función con tu nombre y debe retornar un objeto con tu nombre, 
tu edad y tu nacionalidad. (recuerda hacer commit y push). */

function andres(){
    return {edad: 26, nacionalidad: "Argentina"}
}
