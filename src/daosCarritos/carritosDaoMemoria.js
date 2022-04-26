const ContenedorMemoria = require("../contenedores/contenedorMemoria");

class CarritosDaoMemoria extends ContenedorMemoria {
    constructor() {}

    agregar(carrito) {
        if(this.check(carrito)) {
            super.guardar(carrito);
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }

    updateById(id, carrito) {
        if(this.check(carrito)) {
            for (let i = 0; i < this.memoria.length; i++) {
                if (this.memoria[i].id == id) {
                    carrito.id = id;
                    carrito.timestamp = Date.now();
                    this.memoria[i] = carrito;
                    return carrito;
                }
            }
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }
}