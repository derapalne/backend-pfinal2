const ContenedorFirebase = require("../contenedores/contenedorFirebase");
const check = require("../utils/check");

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(serviceAccount, url) {
        super(serviceAccount, url, "productos");
    }

    async agregar(producto) {
        if(check(producto)) {
            const productos = await this.getAll();
            
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
