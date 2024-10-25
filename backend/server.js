const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const mongo = require('./database/mongo.js');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const { connect } = require('./database/mongo.js');
connect();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(({ origin: '*' })));
app.use(express.json());

const sessionMiddleware = session({
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

app.use(sessionMiddleware);

const proyectPath = path.resolve(__dirname, '../frontend');
app.use(express.static(path.resolve(proyectPath)));

const router =require('./routes/router.js');
app.use('/', router);