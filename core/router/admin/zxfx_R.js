var express = require('express');
var router = express.Router();
var zxfx_C = require('../../controller/admin/zxfx_C')

router.$requestMapping = '/admin/zxfx';
router.get('/profile', zxfx_C(zxfx_C.profileGet));
router.get('/sheaninfo', zxfx_C(zxfx_C.sheaninfoGet));
router.get('/zcfx', zxfx_C(zxfx_C.zcfxGet));
router.get('/gjfx', zxfx_C(zxfx_C.gjfxGet));
router.get('/xffx', zxfx_C(zxfx_C.xffxGet));

module.exports = router;