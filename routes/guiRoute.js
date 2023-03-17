const express = require('express')
const guiController = require('../controllers/guiController')
const router = express.Router()

    router.get('/', guiController)

module.exports = router;