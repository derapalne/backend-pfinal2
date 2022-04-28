const fs = require('fs');

class ContenedorArchivo {

    constructor(fileName) {
        this.fileName = fileName;
        this.archivo = `./src/archivos/${this.fileName}.txt`;
    }

    async guardar(data) {
        try {
            console.log("Guardando en", this.fileName);
            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));
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
            const elemento = await data.filter((e) => e.id == id)[0];
            if(elemento != undefined) {
                return await elemento;
            } else {
                return {error: "Elemento no encontrado"};
            }
        } catch(e) {
            console.log(e);
        }
    }

    async deleteById(id) {
        try {
            let data = await this.cargar();
            const oldLenght = data.length;
            data = data.filter((e) => e.id != id);
            if(data.length != oldLenght) {
                await this.guardar(data);
                console.log("Borrado con éxito");
                return id;
            } else {
                console.log("Error al borrar elemento", id);
                return "Id inexistente"
            }
        } catch(e) {
            console.log(e);
        }
    }

    async deleteAll() {
        try {
            const data = [];
            await this.guardar(data);
            return "Ok";
        } catch(e) {
            console.log(e);
        }
    }

}

module.exports = ContenedorArchivo;
