const mongoose = require("mongoose");

const carritosCollection = "carritos";

const carritosSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    timestamp: {type: Number, required: true},
    productos: {type: Array, required: true}
});

const Carritos = new mongoose.model(carritosCollection, carritosSchema);

module.exports = Carritos;