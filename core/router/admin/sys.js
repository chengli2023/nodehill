var express = require('express');
var router = express.Router();
var indexController = require('../../controller/admin/sys')

router.$requestMapping = '/admin/sys';
router.get('/res', indexController(indexController.resGet));
router.get('/res/checkSameLevelOrder', indexController(indexController.checkSameLevelOrderGet));
router.post('/res/add', indexController(indexController.resAddPost));

router.get('/role', indexController(indexController.roleGet));
router.post('/role/add', indexController(indexController.roleAddPost));
router.get('/role/del', indexController(indexController.roleDelGet));
router.post('/role/edit', indexController(indexController.roleEditPost));
router.get('/role/checkSameName', indexController(indexController.checkSameNameGet));
router.get('/role/acl', indexController(indexController.aclGet));
module.exports = router;