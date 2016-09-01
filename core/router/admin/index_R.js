var express = require('express');
var router = express.Router();
var indexController = require('../../controller/admin/index_C')

router.$requestMapping = '/admin';
router.get('/home', indexController(indexController.homeGet));
router.get('/login', indexController(indexController.loginGet));
router.post('/login', indexController(indexController.loginPost));
router.get('/refreshVerifyCode', indexController(indexController.refreshVerifyCodeGet));
router.get('/logout', indexController(indexController.logoutGet));

router.get('/profile', indexController(indexController.profileGet));

router.get('/userCheckSameEmail', indexController(indexController.userCheckSameEmailGet));
router.get('/checkPassword', indexController(indexController.checkPasswordGet));
router.post('/updateEmail', indexController(indexController.updateEmailPost));
router.post('/updatePassword', indexController(indexController.updatePasswordPost));

module.exports = router;
