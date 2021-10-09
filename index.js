"use strict";

//on charge le .env
require('dotenv').config();
const express = require('express');
//on recupe le module main.js
const main = require("./main");
const { db } = require("./db");
const api_movie = require("./api/movie.js");

var jwt = require('jsonwebtoken');
var fs = require('fs');

//port d'écoute
const port = process.env.PORT || 3000;

const app = express();
//informer le main que c'est du JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on ${port} port.`);
})

//uuid_generate_v4()

//cette fonction est à passer dans les différents sevices
var cert = fs.readFileSync('public-key.pem');  // get public key
//requete resultat next(continuer vers la lecture des données)
function authenticateToken(req, res, next){
  //récupere le header
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  //extrait le token
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token)
  //token null, pas de toke, erreur 401 Non authorized
  if(token == null) return res.sendStatus(401);
  //la on verifie le token en utilisant le fichier impporté
  jwt.verify(token, cert, function(err, decoded) {
    console.log(decoded);
    console.log(cert);
    //si une erreur dans le décodage, 403 mauvaise authentificatio
    if(err) return res.sendStatus(403);
    // si tout ok on passe à next() = la suite de la requete
    next();
  })
}

app.use('/', main());

//fetch la data de la base personne
//app.use('/movie', api_movie(db));

app.use('/movie', require("./api/movie.js")(db ,authenticateToken));

