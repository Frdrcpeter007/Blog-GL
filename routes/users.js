var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', {title: 'Liste des utilisateurs'})
});

router.get('/connexion', function(req, res, next) {
  res.render('connexion', {title: 'Connexion'})
});

router.get('/inscription', function(req, res, next) {
  res.render('inscription', {title: 'Inscription'})
});
module.exports = router;
