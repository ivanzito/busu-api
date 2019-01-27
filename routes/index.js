var express = require('express')
require("dotenv-safe").load()
var jwt = require('jsonwebtoken')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

module.exports = router;
