const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});


//parseo del body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(({ origin: '*' })));
app.use(express.json());

//sesion


//frontend
const proyectPath = path.resolve(__dirname, '../frontend');
app.use(express.static(path.resolve(proyectPath)));


// Rutas de tu API
const router =require('./ROUTES/routes.js');
app.use('/', router);