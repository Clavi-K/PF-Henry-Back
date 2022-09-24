function laCajaDePandora(numero) {
    // proximamente escribiremos codigo aqui

    if(numero % 2 == 0) {
        return (numero >>> 0).toString(2)
    } else {
        return numero.toString(16)
    }

}

function luciano() {
    return {edad: 21, nacionalidad: "Argentina"}
}