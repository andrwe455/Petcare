const mongoose = require('mongoose');
const uri3 = "mongodb+srv://andresgutierrez83111:vN5gYCgoGODdXGUR@cluster0.labzm9a.mongodb.net/taller2?retryWrites=true&w=majority&appName=Cluster0";

function connect() {
  return mongoose.connect(uri3)
  .then((conn) => {
    console.log('Connected to the database');
    return conn;  
  })
  .catch((error) => {
    console.error('Connection error', error);
    throw error;  
  });
}

module.exports = { connect, mongoose };

