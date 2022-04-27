const ContenedorMongoDB = require("../contenedores/contenedorMongoDB")
const check = require("../utils/check");

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor(uri) {
        this.Model = 
        super(uri);
    }

}