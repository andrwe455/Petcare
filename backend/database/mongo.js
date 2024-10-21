// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const mongoose = require('mongoose');
const uri3 = "mongodb+srv://andresgutierrez83111:vN5gYCgoGODdXGUR@cluster0.labzm9a.mongodb.net/taller2?retryWrites=true&w=majority&appName=Cluster0";

function connect() {
    return mongoose.connect(uri3)
        .then((conn) => {
            console.log('Conectado a la base de datos');
            return conn;  // Devolver la conexión para su uso posterior
        })
        .catch((error) => {
            console.error('Error de conexión', error);
            throw error;  // Lanza el error para manejarlo en el nivel superior
        });
}

module.exports = { connect, mongoose };


