const ContenedorFirebase = require("../contenedores/contenedorFirebase");
const check = require("../utils/check");

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor(serviceAccount, url) {
        super(serviceAccount, url, "carritos");
    }

    async agregarCart() {
        const carritos = await this.getAll();
        let id = 0;
        if (carritos.length) {
            id = carritos[carritos.length - 1].id + 1;
        }
        const carrito = {
            id: id,
            timestamp: Date.now(),
            productos: [],
        };
        await this.guardar(carrito);
        return carrito.id;
    }

    async agregarProd(id, producto) {
        if (check(producto)) {
            try {
                const carrito = await this.getById(id);
                if (carrito.productos) {
                    carrito.productos.push(producto);
                    const doc = this.query.doc(id);
                    await doc.update({ productos: carrito.productos });
                    return producto.id;
                } else {
                    return "Id inexistente";
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            return "El producto no cumple los requisitos";
        }
    }

    async deleteProdById(id, idProd) {
            try {
                const carrito = await this.getById(id);
                if (carrito.productos) {
                    carrito.productos = carrito.productos.filter((e) => e.id != idProd);
                    const doc = this.query.doc(id);
                    await doc.update({ productos: carrito.productos });
                    return idProd;
                } else {
                    return "Id inexistente";
                }
            } catch (e) {
                console.log(e);
            }
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get();
            const docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                timestamp: doc.timestamp,
                productos: doc.productos,
            }));
            console.log(response);
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}
