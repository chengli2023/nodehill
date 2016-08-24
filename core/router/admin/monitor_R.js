var express = require('express');
var router = express.Router();
var monitor_C = require('../../controller/admin/monitor_C')

router.$requestMapping = '/admin/monitor';
router.get('/interface', monitor_C(monitor_C.interfaceGet));
router.get('/server', monitor_C(monitor_C.serverGet));

module.exports = router;