var express = require('express');
var router = express.Router();
var indexController = require('../../controller/admin/Index')

router.$requestMapping = '/admin';
router.get('/login', indexController(indexController.loginGet));
router.post('/login', indexController(indexController.loginPost));
router.get('/logout', indexController(indexController.logoutGet));
router.get('/search', indexController(indexController.searchGet));
module.exports = router;