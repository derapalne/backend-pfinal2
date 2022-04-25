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

}