require('dotenv').config();

// Empty object {} means no additional config required
//charge le module postgre
const pgp = require('pg-promise')({});

const config = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

exports.db = pgp(config);