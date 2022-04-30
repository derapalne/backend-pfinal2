const admin = require("firebase-admin");


class ContenedorFirebase {

    constructor(serviceAccount, dbUrl, collName) {
        try {
             admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: dbUrl
              }, collName);
              console.log("Base de datos conectada:", collName);
              this.collName = collName;
              this.db = admin.firestore();
              this.query = this.db.collection(collName);
        } catch (e) {
            console.log(e);
        }
    }

    async guardar(data) {
        try {
            let doc = this.query.doc();
            await doc.create(data);
        } catch(e) {
            console.log(e);
        }
    }

    async getById(id) {
        try {
            let doc = this.query.doc(`${id}`);
            const item = await doc.get();
            const response = item.data();
            return response;
        } catch(e) {
            console.log(e);
        }
    }

    async deleteById(id) {
        try {
            const doc = this.query.doc(`${id}`);
            const response = await doc.delete();
            return response;
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = ContenedorFirebase;