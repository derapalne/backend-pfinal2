const mongoose = require("mongoose");
const ContenedorMongoDB = require("../contenedores/contenedorMongoDB")
const check = require("../utils/check");
const Productos = require("../models/productos");


class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor(uri) {
        this.Model = Productos;
        super(uri), this.Model;
    }

    async updateProducto() {
        try {
            mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            // TODO TODO TODO TODO
        } catch (e) {
            console.log(e);
        }
    }

}