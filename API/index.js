const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

//Crear el servidor  (aveces le ponía app, es lo mismo)
const server = express();

//Habilitar CORS
//server.use(cors());    CON ESTA LINEA PUEDEN INGRESAR DE CUALQUIER URL
//Vamos a crear un lista blanca, para que solo la url que le digamos, tenga acceso a la API
const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        const existe = whiteList.some( dominio => dominio === origin);
        if(existe){
            callback(null, true);
        } else {
            callback(new Error('No Permitido por CORS'));
        }
    }
}

//server.use(cors(corsOptions));
server.use(cors());

//Conectar a mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/veterinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//Middleware
//server.use(express.json());
//Habilitar el body-parser. Para extraer lo que el usuario envia.  y lo pone en una variable.
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//Habilitar routing
server.use('/', routes());

//puerto y arrancar el servidor
server.listen(4000, () =>{
    console.log('Servidor funcionando');
});