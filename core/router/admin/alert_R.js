var express = require('express');
var router = express.Router();
var alert_C = require('../../controller/admin/alert_C')

router.$requestMapping = '/admin/alert';
router.get('/receiver', alert_C(alert_C.receiverGet));
router.get('/zichan', alert_C(alert_C.zichanGet));
router.get('/area', alert_C(alert_C.areaGet));

module.exports = router;