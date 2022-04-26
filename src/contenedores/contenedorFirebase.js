const admin = require("firebase-admin");


class Contenedorfirebase {

    constructor(serviceAccount, dbUrl, collName) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: dbUrl
              });
              console.log("Base de datos conectada:", collName)
        } catch (e) {

        }
        this.collName = collName;
        this.db = admin.firestore();
        this.query = db.collection(collName);
    }

    async guardar(data) {
        try {
            let doc = this.query.doc();
            await doc.create(data);
        } catch(e) {
            console.log(e);
        }
    }

    async getAll() {

    }

    async getById(id) {
        try {
            let doc = this.query.doc(`${id}`);
            
        } catch(e) {
            console.log(e);
        }
    }

}