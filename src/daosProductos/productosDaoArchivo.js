const ContenedorArchivo = require("../contenedores/contenedorArchivo");
const check = require("../utils/check");

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super({fileName: "productos"});
    }

    async agregar(producto) {
        if(check(producto)) {
            try {
                const productos = await this.cargar();
                productos.push(producto);
                await this.guardar(productos);
            } catch (e) {
                console.log(e);
            }
        }
    }

}