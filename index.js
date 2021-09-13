"use strict";

//on charge le .env
require('dotenv').config();

//port d'écoute
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.listen(port, () => {
  console.log(`Server is running on ${port} port.`);
})