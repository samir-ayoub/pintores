var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Samir' });
});
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Samir' });
});
module.exports = router;
