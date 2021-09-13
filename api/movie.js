module.exports = (db) => {

    const router = require('express').Router();
  
    //racine du module
    router.get('/', async (req, res) => {
      const data = await db.any("SELECT * from personne")
      res.status(200).json({ status: 'success', data: data });
      });

    router.post('/', async (req, res) => {
      db.one("insert into personne (nom, prenom, nationalite) VALUES ($1, $2, $3) RETURNING id",
      [req.body.nom, req.body.prenom, req.body.nationalite])
        .then(function(data) {
          res.status(201).json({ status: 'success', data: data });
        })
        .catch(function(reason) {
          res.status(500).json(reason);
        });
    });

    router.delete('/:id', (req, res) => {
      db.one("delete from personne where id = $1 RETURNING id", req.params.id)
        .then(function(data) {
          res.status(200).json({ status: 'success', data: data });
        })
        .catch(function(reason) {
          res.status(500).json(reason);
        })
    });

    return router;
  }