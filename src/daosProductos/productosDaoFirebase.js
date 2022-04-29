const ContenedorFirebase = require("../contenedores/contenedorFirebase");
const check = require("../utils/check");

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(serviceAccount, url) {
        super(serviceAccount, url, "productos");
    }

    async agregar(producto) {
        if (check(producto)) {
            try {
                const productos = await this.getAll();
                let id = 0;
                if (productos.length) {
                    id = productos[productos.length - 1].id + 1;
                }
                producto.id = id;
                producto.timestamp = Date.now();
                await this.guardar(producto);
            } catch (e) {
                console.log(e);
            }
        } else {
            return "El producto no cumple los requisitos";
        }
    }

    async updateById(id, producto) {
        if(check(producto)) {
            try {
                const doc = await this.query.doc(id);
                await doc.update({
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    codigo: producto.codigo,
                    precio: producto.precio,
                    thumbnail: producto.thumbnail,
                    stock: producto.stock,
                    timestamp: Date.now()
                })
                return id;
            } catch (e) {
                console.log(e);
            }
        } else {
            return "El producto no cumple los requisitos"
        }
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get();
            const docs = querySnapshot.docs;
            const response = docs.map((doc) => ({
                id: doc.id,
                timestamp: doc.timestamp,
                nombre: doc.nombre,
                descripcion: doc.descripcion,
                thumbnail: doc.thumbnail,
                precio: doc.precio,
                codigo: doc.codigo,
                stock: doc.stock,
            }));
            console.log(response);
            return response;
        } catch (e) {
            console.log(e);
        }
    }
}
