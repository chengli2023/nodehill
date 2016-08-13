var express = require('express');
var router = express.Router();
var indexController = require('../controller/Index')

router.$requestMapping = '/';
router.get('/', indexController(indexController.index));

module.exports = router;