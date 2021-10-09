module.exports = (db, authenticateToken) => {

    const router = require('express').Router();
  
    //racine du module
    router.get('/', authenticateToken, async (req, res) => {
      const data = await db.any("SELECT * from personne")
      res.status(200).json({ status: 'success', data: data });
      });

    router.post('/', authenticateToken, async (req, res) => {
      db.one("insert into personne (nom, prenom, nationalite) VALUES ($1, $2, $3) RETURNING id",
      [req.body.nom, req.body.prenom, req.body.nationalite])
        .then(function(data) {
          res.status(201).json({ status: 'success', data: data });
        })
        .catch(function(reason) {
          res.status(500).json(reason);
        });
    });

    router.delete('/:id', authenticateToken, (req, res) => {
      db.one("delete from personne where id = $1 RETURNING id", req.params.id)
        .then(function(data) {
          res.status(200).json({ status: 'success', data: data });
        })
        .catch(function(reason) {
          res.status(500).json(reason);
        })
    });

    router.get('/film/:id', authenticateToken, async (req, res) => {
      const data = await db.any(`SELECT
      f.titre, p.nom, p.prenom from films f 
      inner join joue j on (f.id=j.id_film) 
      inner join personne p on (j.id_acteur=p.id) 
      where f.id = $1`,req.params.id);
      res.status(200).json({ status: 'success', data: data });
      });


    return router;
  }

  //Service web avec nodeJS, Express, Postgres
  //Le module moovie est sur route /movie
  //http://localhost:3000