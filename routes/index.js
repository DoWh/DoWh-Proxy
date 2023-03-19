const express = require('express')
const guiController = require('../controllers/guiController')
const grabAutoProxyController = require('../controllers/grabAutoProxyController')
const grabProxyFromLinksController = require('../controllers/grabProxyFromLinksController')
const router = express.Router()

    router.use(express.static('../public'))

    router.get('/', guiController)

    router.use('/api', express.json());

    router.post('/api/grabAutoProxy', grabAutoProxyController)

    router.post('/api/grabProxyFromLinks', grabProxyFromLinksController)


module.exports = router;