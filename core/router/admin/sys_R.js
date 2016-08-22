var express = require('express');
var router = express.Router();
var indexController = require('../../controller/admin/sys_C')

router.$requestMapping = '/admin/sys';
/***************************资源管理路由***************************************/
router.get('/res', indexController(indexController.resGet));
router.get('/res/checkSameNameInRes', indexController(indexController.checkSameNameInResGet));
router.post('/res/add', indexController(indexController.resAddPost));
router.get('/res/del', indexController(indexController.resDelGet));
router.post('/res/edit', indexController(indexController.resEditPost));
router.get('/res/resDetail', indexController(indexController.resDetailGet));

/***************************角色管理路由***************************************/
router.get('/role', indexController(indexController.roleGet));
router.post('/role/add', indexController(indexController.roleAddPost));
router.get('/role/del', indexController(indexController.roleDelGet));
router.post('/role/edit', indexController(indexController.roleEditPost));
router.get('/role/roleCheckSameName', indexController(indexController.roleCheckSameNameGet));
router.get('/role/acl', indexController(indexController.aclGet));
router.post('/role/aclSet', indexController(indexController.aclSetPost));
router.get('/role/roleDetail', indexController(indexController.roleDetailGet));

/***************************用户管理路由***************************************/
router.get('/user', indexController(indexController.userGet));
router.post('/user/create', indexController(indexController.userCreatePost));
router.post('/user/edit', indexController(indexController.userEditPost));
router.get('/user/detail', indexController(indexController.userDetailGet));
router.get('/user/del', indexController(indexController.userDelGet));
router.get('/user/userCheckSameName', indexController(indexController.userCheckSameNameGet));
router.get('/user/refreshPassword', indexController(indexController.refreshPasswordGet));


module.exports = router;