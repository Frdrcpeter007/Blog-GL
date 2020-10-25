var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Page à propos
router.get("/about", (req, res) => {
  res.render("about", {title: "A propos de notre blog"})
})

//Page blog
router.get("/blog", (req, res) => {
  res.render("blog", {title: "Le blog"})
})

//Page contactez-nous
router.get("/contact", (req, res) => {
  res.render("contact", {title: "Contactez-nous"})
})

//Page marketing
router.get("/marketing", (req, res) => {
  res.render("marketing", {title: "Page Marketing"})
})

module.exports = router;
