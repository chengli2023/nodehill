var express = require('express');
var router = express.Router();
var indexController = require('../../controller/admin/sys')

router.$requestMapping = '/admin/sys';
router.get('/res', indexController(indexController.resGet));
module.exports = router;