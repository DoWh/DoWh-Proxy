const express = require('express')
const validateProxyController = require(__appdir + '/controllers/validateProxyController')
const router = express.Router()

    router.use('/', express.json());
    router.post('/', validateProxyController)

module.exports = router;