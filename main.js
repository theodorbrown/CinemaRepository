module.exports = () => {

    //récupération du pacquet
    const router = require('express').Router();
  
    //on crée une fonction asynchrone. Param requete/résultat
    //fonction anonyme
    //200 c'est statut normal
    router.get('/', async (req, res) => {
      res.status(200).json("Application Cinéma");
    });
  
    router.get('/version', async (req, res) => {
      res.status(200).send("1.0");
    });
  
    return router;
}