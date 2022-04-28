const mongoose = require("mongoose");
const ContenedorMongoDB = require("../contenedores/contenedorMongoDB");
const check = require("../utils/check");
const Productos = require("../models/productos");

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor(uri) {
        this.Model = Productos;
        super(uri), this.Model;
    }

    async updateById(id, producto) {
        if (check(producto)) {
            try {
                mongoose.connect(this.uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });

                const res = await this.Model.updateOne(
                    { id: id },
                    {
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        precio: producto.precio,
                        thumbnail: producto.thumbnail,
                        stock: producto.stock,
                        timestamp: producto.timestamp,
                    }
                );
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }
}

module.exports = ProductosDaoMongoDB;