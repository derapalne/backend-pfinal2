const ContenedorMemoria = require("../contenedores/contenedorMemoria");

class CarritosDaoMemoria extends ContenedorMemoria {
    constructor() {}

    agregarCart() {
        const carrito = {
            productos: [],
        };
        return this.guardar(carrito);
    }

    agregarProd(idCart, producto) {
        if (check(producto)) {
            const indexCarrito = this.memoria.findIndex((c) => c.id == idCart);
            if (indexCarrito != -1) {
                this.memoria[indexCarrito].productos.push(producto);
            } else {
                return "Id inexistente.";
            }
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }

    deleteProdById(id, idProd) {
        const indexCarrito = this.memoria.findIndex((c) => c.id == id);
        this.memoria[indexCarrito].productos = this.memoria[indexCarrito].productos.filter(
            (e) => e.id != idProd
        );
    }
}

module.exports = CarritosDaoMemoria;
