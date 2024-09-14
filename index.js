const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

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

app.post("/pokemon", (req, res, next)=>{
    return res.status(200).send(req.body);
});

app.get("/pokemon", (req, res, next)=>{//sirve para que te muestre todos los pokemones
    return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next)=>{//sirve para que te muestre el pokemon por id
    const id = req.params.id -1;
    (id >= 0 && id <= 150) ? res.status(200).send(pokemon[req.params.id-1]) :
    res.status(404).send("Pokemon no encontrado");
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next)=>{//sirve para que te muestre el pokemon por nombre
    const name = req.params.name;
    const pk = pokemon.filter((p) =>{
        return (p.name.toUpperCase()==name.toUpperCase()) ? p : null;
    });
    (pk.length>0) ? res.status(200).send(pk) : res.status(404).send("Pokemon no encontrado...")
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is Running...")
})