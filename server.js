const config = require("./src/utils/config");
const express = require("express");
const { Router } = express;
const selector = require("./src/utils/selector")

const routerProd = Router();
const routerCart = Router();
const app = express();
const productosDao = selector.productosDao;
const carritosDao = selector.carritosDao;

const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProd);
app.use("/api/carrito", routerCart);

// ADMIN CHECK

const isAdmin = (req, res, next) => {
    let admin = true;
    if (admin) {
        next();
    } else {
        res.status(203).json({
            error: -1,
            descripcion: `Ruta ${req.url} Método ${req.method} no autorizado`,
        });
    }
};


// ---------------------------------------------- ROUTER PRODUCTOS ----------------------//

// Me permite listar todos los productos disponibles ó un producto por su ID
// USUARIO + ADMIN
routerProd.get("/:id?", async (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.status(200).json(await productosDao.getAll());
    } else {
        const respuesta = await productosDao.getById(id);
        if (respuesta.error) {
            res.status(204).json(respuesta);
        } else {
            res.status(200).json(respuesta);
        }
    }
});

// Para incorporar productos al listado
// ADMIN
routerProd.post("/", isAdmin, async (req, res) => {
    const producto = req.body.producto;
    const prodId = await productosDao.agregar(producto);
    res.status(201).json(prodId);
});

// Actualiza un producto por su ID
// ADMIN
routerProd.put("/:id", isAdmin, async (req, res) => {
    const admin = req.body.admin;
    const id = req.params.id;
    const producto = req.body.producto;
    const prodId = await productosDao.updateById(id, producto);
    res.status(201).json(prodId);
});

// Borra un producto por su ID
// ADMIN
routerProd.delete("/:id", isAdmin, async (req, res) => {
    const admin = req.body.admin;
    const id = req.params.id;
    const prodId = await productosDao.deleteById(id);
    res.status(200).json(prodId);
});

// ---------------------------------------------- ROUTER CARRITO ------------------------//

// Crea un carrito y devuelve su ID
routerCart.post("/", async (req, res) => {
    res.status(201).json(await carritosDao.agregarCart());
});

// Vacía un carrito y lo elimina
routerCart.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await carritosDao.deleteById(id));
});

// Me permite listar todos los productos guardados en el carrito
routerCart.get("/:id/productos", async (req, res) => {
    const id = req.params.id;
    const carrito = await carritosDao.getById(id);
    if (carrito) {
        res.status(200).json(await carrito.productos);
    } else {
        res.status(404).json({ error: "Carrito inexistente" });
    }
});

// Para incorporar productos al carrito por su ID de producto
routerCart.post("/:id/productos", async (req, res) => {
    const idCart = req.params.id;
    const idProd = req.body.idProd;
    const producto = await productosDao.getById(idProd);
    if (producto.error) {
        res.status(204).json(producto);
    } else {
        const carritoReturn = await carritosDao.agregarProd(idCart, producto);
        if (carritoReturn) {
            res.status(204).json(carritoReturn);
        } else {
            res.status(201).json({ mensaje: "Producto agregado." });
        }
    }
});

// Eliminar un producto del carrito por su ID de carrito e ID de producto
routerCart.delete("/:id/productos/:id_prod", (req, res) => {
    const idCart = req.params.id;
    const idProd = req.params.id_prod;
    carritosDao.deleteProdById(idCart, idProd);
    res.status(200).json({ mensaje: "El producto fue borrado" });
});

// ERROR 404

app.use((err, req, res, next) => {
    res.status(404).send({
        error: -2,
        descripcion: `Url ${req.url}, método ${req.method} no implementado`,
    });
});


// PRUEBAS

// productosApi.addProducto({
//     nombre: "Guerra Biológica",
//     descripcion: "Efectivo contra tu vecino molesto.",
//     codigo: "GB398",
//     stock: 10,
//     precio: 800000000,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/finance-152/64/9-256.png",
// });

// productosApi.addProducto({
//     nombre: "Soborno",
//     descripcion: "Funciona sin fallas, siempre y cuando no te enganchen.",
//     codigo: "S133",
//     stock: 15,
//     precio: 75000,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/finance-152/64/7-256.png",
// });

// productosApi.addProducto({
//     nombre: "Manteca Brillante",
//     descripcion: "Es dura. No se recomienda comer.",
//     codigo: "MB078",
//     stock: 50,
//     precio: 150000,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/finance-152/64/29-256.png",
// });

// productosApi.addProducto({
//     nombre: "Martillo Bromista",
//     descripcion: "Convierte a tus amigos en monedas de diez centavos sin esfuerzo.",
//     codigo: "MB120",
//     stock: 2,
//     precio: 700,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/finance-152/64/26-256.png",
// });

// carritosApi.crearCarrito();
// carritosApi.crearCarrito();
// carritosApi.crearCarrito();

// PRENDER EL SERVER jijiji

const server = app.listen(PORT, () => {
    console.log("Servidor escuchando en puerto ", PORT);
});
server.on("error", (e) => console.log("Error en el servidor: ", e));
