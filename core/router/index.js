var express = require('express');
var router = express.Router();
var indexController = require('../controller/index')

router.$requestMapping = '/';
router.get('/', indexController(indexController.index));

module.exports = router;
