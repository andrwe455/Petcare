const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const sesion = require('express-session');
const mongoStore = require('connect-mongo');
const mongo = require('./database/mongo.js');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// Conexión a la base de datos
const { connect } = require('./database/mongo.js');
connect();



//parseo del body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(({ origin: '*' })));
app.use(express.json());

//sesion
const sessionmiddleware = sesion({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        httpOnly: false,
        signed: false
    },
    store: mongoStore.create({
        client: mongo.mongoose.connection.getClient(),
        collectionName: 'sessions',
        stringify: false,
        autoRemove: 'native',
    }),
});

app.use(sessionmiddleware);

//frontend
const proyectPath = path.resolve(__dirname, '../frontend');
app.use(express.static(path.resolve(proyectPath)));


// Rutas de tu API
const router =require('./routes/router.js');
app.use('/', router);