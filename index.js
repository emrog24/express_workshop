
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routers/pokemon');
const e = require('express');

app.use(morgan('dev'));
//app.use(express.json());
//app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
    return res.status(200).json({ code:1, massage:"Bienvenido a la Pokedex"});
});

app.use("/pokemon", pokemon);

app.use((req, res, next)=>{
    return res.status(404).json({ code: 404, message: "URL no encontrada"});
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is Running...")
})