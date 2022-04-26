const admin = require("firebase-admin");

const admin = require("firebase-admin");

const serviceAccount = require("../src/proyectofinal-coderhouse-firebase-adminsdk-8w9pr-0ff90cd6c8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "http://proyectofinal-coderhouse.firebaseio.com"
});

class Contenedorfirebase {
    
}