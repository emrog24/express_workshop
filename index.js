const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routers/pokemon');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
INTERCAMBIOS DE PETICIONES:
Vervos HTTP
GET - Obtener recursos
POST - Almacenar recursos
PATCH - Modificar una parte de un recurso
PUT - modificar un recurso
DELETE - Borrar un recurso
*/

app.get("/", (req, res, next)=>{
    return res.status(200).send("Bienvenido a la Pokedex");
});

app.use("/pokemon", pokemon);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is Running...")
})