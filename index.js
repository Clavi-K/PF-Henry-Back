function laCajaDePandora(numero) {
    // proximamente escribiremos codigo aqui

    if(numero % 2 === 0) return (numero >>> 0).toString(2)

    return (numero >>> 0).toString(16)

}