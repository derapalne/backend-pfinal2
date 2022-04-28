const ContenedorMongoDB = require("../contenedores/contenedorMongoDB");
const mongoose = require("mongoose");
const Carritos = require("../models/carritos");
const check = require("../utils/check")

class CarritosDaoMongoDB extends ContenedorMongoDB {

    constructor(uri) {
        this.Model = Carritos;
        super(uri, this.Model);
    }

    async agregarProducto(id, producto) {
        if(check(producto)) {
            try {
                mongoose.connect(this.uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                const carrito = await this.Model.find({id: id});
                if(carrito.length) {
                    await carrito[0].productos.push(producto);
                    await this.Model.updateOne({id: id}, {productos: carrito[0].productos});
                    return producto.id;
                } else {
                    return "Id inexistente."
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }

    async borrarProductoById(id, idProd) {
        if(check(producto)) {
            try {
                mongoose.connect(this.uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                const carrito = await this.Model.find({id: id});
                if(carrito.length) {
                    const oldLenght = carrito[0].productos.length;
                    carrito[0].productos = await carrito[0].productos.filter((e) => e.id != idProd);
                    if(carrito[0].productos.length != oldLenght) {
                        await this.Model.updateOne({id: id}, {productos: carrito[0].productos});
                        return idProd;
                    } else {
                        return "No se ha podido borrar el producto"
                    }
                    
                } else {
                    return "Id inexistente."
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log("El producto no cumple los requisitos");
        }
    }
    
}