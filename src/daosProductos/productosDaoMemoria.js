const ContenedorMemoria = require('../contenedores/contenedorMemoria');
const check = require("../utils/check");

class ProductosDaoMemoria extends ContenedorMemoria {

    constructor() {

    }

    agregar(producto) {
        if(check(producto)) {
            return super.guardar(producto);
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }

    updateById(id, producto) {
        if(check(producto)) {
            for (let i = 0; i < this.memoria.length; i++) {
                if (this.memoria[i].id == id) {
                    producto.id = id;
                    producto.timestamp = Date.now();
                    this.memoria[i] = producto;
                    return producto;
                }
            }
            
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }

}

module.exports = ProductosDaoMemoria;