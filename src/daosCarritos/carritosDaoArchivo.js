const ContenedorArchivo = require("../contenedores/contenedorArchivo");
const check = require("../utils/check")

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("carritos");
    }

    async agregarCart() {
        try {
            const carritos = await this.cargar();
            console.log(carritos)
            let id = 0;
            if (carritos.length) {
                id = carritos[carritos.length - 1].id + 1;
            }
            const carrito = {
                id: id,
                timestamp: Date.now(),
                productos: [],
            };
            await carritos.push(carrito);
            await this.guardar(carritos);
            return carrito.id;
        } catch(e) {
            console.log(e);
        }
        
    }

    async agregarProd(id, producto) {
        if (check(producto)) {
            const carritos = await this.cargar();
            const indexCarrito = await carritos.findIndex((c) => c.id == id);
            if (indexCarrito != -1) {
                carritos[indexCarrito].productos.push(producto);
                await this.guardar(carritos);
            } else {
                return "Id inexistente.";
            }
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }

    async deleteProdById(id, idProd) {
        const carritos = await this.cargar();
        const indexCarrito = carritos.findIndex((c) => c.id == id);
        carritos[indexCarrito].productos = carritos[indexCarrito].productos.filter(
            (p) => p.id != idProd
        );
        await this.guardar(carritos);
    }
}

module.exports = CarritosDaoArchivo;
