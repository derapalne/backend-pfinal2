const CarritosDaoMemoria = require("../daosCarritos/carritosDaoMemoria");
const CarritosDaoArchivo = require("../daosCarritos/carritosDaoArchivo");
const CarritosDaoMongoDB = require("../daosCarritos/carritosDaoMongoDB");
const CarritosDaoFirebase = require("../daosCarritos/carritosDaoFirebase");
const ProductosDaoMemoria = require("../daosProductos/productosDaoMemoria");
const ProductosDaoArchivo = require("../daosProductos/productosDaoArchivo");
const ProductosDaoMongoDB = require("../daosProductos/productosDaoMongoDB");
const ProductosDaoFirebase = require("../daosProductos/productosDaoFirebase");

const config = require("./config");
console.log(config.TIPO_DB);
const db = config.TIPO_DB || "memoria";

const uri = "mongodb://localhost:27017/pfinal2-coder";

const serviceAccount = require("../db/credentials.json");
const dbUrl = "http://proyectofinal-coderhouse.firebaseio.com"; //cambiar si es necesario

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
    case "firebase":
        carritosDao = new CarritosDaoFirebase(serviceAccount, dbUrl);
        productosDao = new ProductosDaoFirebase(serviceAccount, dbUrl);
        break;
}

module.exports = { productosDao, carritosDao };
