class ContenedorMemoria {

    constructor() {
        this.memoria = [];
    }

    guardar(datoNuevo) {
        if(this.memoria.legnth) {
            datoNuevo.id = 0;
        } else {
            datoNuevo.id = this.memoria[this.memoria.length-1].id + 1;
        }
        datoNuevo.timestamp = Date.now();
        this.memoria.push(datoNuevo);
        return datoNuevo.id;
    }

    getAll() {
        return this.memoria;
    }

    getById(id) {
        return this.memoria.filter((e) => e.id == id)[0];
    }

    deleteById(id) {
        this.memoria = this.memoria.filter((e) => e.is != id);
    }

    deleteAll() {
        this.memoria = [];
    }

}

module.exports = ContenedorMemoria;