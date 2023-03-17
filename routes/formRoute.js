const express = require('express')
const formController = require(__appdir + '/controllers/formController')
const router = express.Router()

    router.use('/', express.json());
    router.post('/', formController)

module.exports = router;