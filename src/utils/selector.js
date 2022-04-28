const CarritosDaoMemoria = require("../daosCarritos/carritosDaoMemoria");
const CarritosDaoArchivo = require("../daosCarritos/carritosDaoArchivo");
const CarritosDaoMongoDB = require("../daosCarritos/carritosDaoMongoDB");

const ProductosDaoMemoria = require("../daosProductos/productosDaoMemoria");
const ProductosDaoArchivo = require("../daosProductos/productosDaoArchivo");
const ProductosDaoMongoDB = require("../daosProductos/productosDaoMongoDB");

const db = PROCESS.ENV.TIPO_DB || "memoria";

const uri = "mongodb://localhost:27017/pfinal2-coder";

const serviceAccount = require("../db/proyectofinal-coderhouse-firebase-adminsdk-8w9pr-0ff90cd6c8.json");
const dbUrl = "http://proyectofinal-coderhouse.firebaseio.com";

let productosDao;
let carritosDao;

switch (db) {
    case "memoria":
        carritosDao = new CarritosDaoMemoria();
        productosDao = new ProductosDaoMemoria();
        break;
    case "archivo":
        carritosDao = new CarritosDaoArchivo();
        productosDao = new ProductosDaoArchivo();
        break;
    case "mongodb":
        carritosDao = new CarritosDaoMongoDB(uri);
        productosDao = new ProductosDaoMongoDB(uri);
        break;
}

module.exports = { productosDao, carritosDao };
