//Deoendencies
const morgan = require('morgan');
const express = require('express');
const app = express();
//routers
const pokemon = require('./routers/pokemon');
const user = require('./routers/user');
const e = require('express');
//middelware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');



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

app.get("/", index);
app.use("/user", user);
app.use(auth);
app.use("/pokemon", pokemon);
app.use(notFound);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is Running...")
})