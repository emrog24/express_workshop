const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next)=>{
    return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next)=>{//sirve para que te muestre todos los pokemones
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({ code: 1, message: pkmn});
});

pokemon.get('/:id([0-9]{1,3})',async (req, res, next)=>{//sirve para que te muestre el pokemon por id
    const id = req.params.id;
    if(id >= 1 && id <= 722){
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json({ code: 1, message: pkmn});
    }    
    return res.status(404).send({ code: 404, message: "Pokemon no encontrado..."});
});

pokemon.get('/:name([A-Za-z]+)', (req, res, next)=>{//sirve para que te muestre el pokemon por nombre
    const name = req.params.name;
    const pkmn = db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';");
    if(pkmn.length > 0){
        return res.status(200).json({ code: 1, message: pkmn});
    }
    return res.status(404).send({ code: 404, message: "Pokemon no encontrado..."});
});


module.exports = pokemon;