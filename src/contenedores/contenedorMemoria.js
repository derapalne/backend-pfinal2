class ContenedorMemoria {

    constructor() {
        this.memoria = [];
    }

    guardar(datoNuevo) {
        console.log( this.memoria.length );
        if(this.memoria.length == 0) {
            datoNuevo.id = 0;
            console.log("hola funionando bien");
        } else {
            console.log("hola funcionando raro");
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