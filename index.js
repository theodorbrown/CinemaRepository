"use strict";

//on charge le .env
require('dotenv').config();
const express = require('express');
//on recupe le module main.js
const main = require("./main");
const { db } = require("./db");
const api_movie = require("./api/movie.js");

//port d'écoute
const port = process.env.PORT || 3000;

const app = express();
//informer le main que c'est du JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on ${port} port.`);
})
app.use('/', main());

//fetch la data de la base personne
app.use('/movie', api_movie(db));
