class ContenedorMemoria {

    constructor() {
        this.memoria = [];
    }

    guardar(datoNuevo) {
        this.memoria.push(datoNuevo);
    }

    cargar() {
        return this.memoria;
    }

    getById(id) {
        return this.memoria.filter((e) => e.id == id);
    }

    deleteById(id) {
        this.memoria = this.memoria.filter((e) => e.is != id);
    }

}