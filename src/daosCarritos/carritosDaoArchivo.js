const ContenedorArchivo = require("../contenedores/contenedorArchivo");

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super({fileName: "carritos"});
    }

}