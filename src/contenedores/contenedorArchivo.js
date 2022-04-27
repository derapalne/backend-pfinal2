const fs = require('fs');

class ContenedorArchivo {

    constructor(fileName) {
        this.fileName = fileName;
        this.archivo = `${__dirname}/src/archivos/${fileName}.txt`;
    }

    async guardar(data) {
        try {
            console.log("Guardando en", this.fileName);
            await fs.promises.writeFile(this.archivo, JSON.stringify(data));
            console.log("Guardado con éxito");
        } catch (e) {
            console.log(`Error guardando datos en ${this.fileName}`, e);
        }
    }

    async cargar() {
        try {
            console.log("Cargando desde", this.fileName);
            const dataJson = await fs.promises.readFile(this.archivo, "utf-8");
            const data = await JSON.parse(dataJson);
            console.log("Cargado con éxito");
            return data;
        } catch (e) {
            console.log(`Error cargando datos desde ${this.fileName}`, e);
        } 
    }

    async getAll() {
        try {
            return await this.cargar();
        } catch(e) {

        }
    }

    async getById(id) {
        try {
            const data = await this.cargar();
            return data.filter((e) => e.id == id);
        } catch(e) {
            console.log(e);
        }
    }

    async deleteById(id) {
        try {
            const data = await this.cargar();
            const oldLenght = data.length;
            data = data.filter((e) => e.id != id);
            if(data.length != oldLenght) {
                await this.guardar(data);
                console.log("Borrado con éxito");
            } else {
                console.log("Error al borrar elemento");
            }
        } catch(e) {
            console.log(e);
        }
    }

    async deleteAll() {
        try {
            const data = [];
            await this.guardar(data);
        } catch(e) {

        }
    }

}

module.exports = ContenedorArchivo;
