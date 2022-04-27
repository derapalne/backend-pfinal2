const ContenedorMongoDB = require("../contenedores/contenedorMongoDB");
const mongoose = require("mongoose");
const Carritos = require("../models/carritos")

class CarritosDaoMongoDB extends ContenedorMongoDB {

    constructor(uri) {
        this.Model = Carritos;
        super(uri, this.Model);
    }


    
}