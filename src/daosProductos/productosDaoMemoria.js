const ContenedorMemoria = require('../contenedores/contenedorMemoria');

class ProductosDaoMemoria extends ContenedorMemoria {

    constructor() {

    }

    agregar(producto) {
        if(this.check(producto)) {
            if(this.memoria.legnth) {
                producto.id = 0;
            } else {
                producto.id = this.memoria[this.memoria.length-1].id + 1;
            }
            super.guardar(producto);
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }

    updateById(id, producto) {
        if(this.check(producto)) {
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

    check(producto) {
        if (!producto.nombre) {
            console.log("error en  nombre");
            return false;
        }
        if (!producto.descripcion) {
            console.log("error en descripcion");
            return false;
        }
        if (!producto.codigo) {
            console.log("error en codigo");
            return false;
        }
        if (!producto.precio) {
            console.log("error en precio");
            return false;
        } else {
            const precio = Number(producto.precio);
            if (isNaN(precio)) {
                console.log("error en precio");
                return false;
            }
        }
        if (!producto.thumbnail) {
            console.log("error en thumbnail");
            return false;
        }
        if (!producto.stock) {
            console.log("error en stock");
            return false;
        }
        return true;
    }

}