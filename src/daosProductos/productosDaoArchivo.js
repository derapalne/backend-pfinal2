const ContenedorArchivo = require("../contenedores/contenedorArchivo");
const check = require("../utils/check");

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super("productos");
    }

    async agregar(producto) {
        if (check(producto)) {
            try {
                const productos = await this.cargar();
                if (productos.length == 0) {
                    producto.id = 0;
                } else {
                    producto.id = productos[productos.length - 1].id + 1;
                }
                productos.push(producto);
                await this.guardar(productos);
                return producto.id;
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }

    async updateById(id, producto) {
        if (check(producto)) {
            try {
                const productos = await this.cargar();
                for (let i = 0; i < productos.length; i++) {
                    if (productos[i].id == id) {
                        producto.id = id;
                        producto.timestamp = Date.now();
                        productos[i] = producto;
                        return producto;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }
}

module.exports = ProductosDaoArchivo;