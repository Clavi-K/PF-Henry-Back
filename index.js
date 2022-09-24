function laCajaDePandora(numero) {
    // proximamente escribiremos codigo aqui
    if(numero%0){
        return(numero >>> 0).toString(2)
    } else {
        return(numero >>> 0).toString(16)
    }
}

function sergio() {
    return{
        edad:31,
        nacionalidad:'Argentina'
    }
}