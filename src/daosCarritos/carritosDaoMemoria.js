const ContenedorMemoria = require("../contenedores/contenedorMemoria");

class CarritosDaoMemoria extends ContenedorMemoria {
    constructor() {}

    nuevoCarrito() {
        let id = 0;
        if (this.memoria.length) {
            id = this.memoria[this.memoria.length - 1].id + 1;
        }
        const carrito = {
            id: id,
            timestamp: Date.now(),
            productos: [],
        };
        this.memoria.push(carrito);
        return carrito.id;
    }

    agregarProducto(idCart, producto) {
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
