var express = require('express');
var router = express.Router();
const model = require('../../models/Users');

//Inscription de l'utilisateur
router.post("/register", model.register)

module.exports = router;