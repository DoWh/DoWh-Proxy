const express = require('express')
const path = require('path')
const guiController = require('../controllers/guiController')
const grabAutoProxyController = require('../controllers/grabAutoProxyController')
const grabProxyFromLinksController = require('../controllers/grabProxyFromLinksController')
const router = express.Router()

    router.use('/', express.json());

    router.use(express.static(path.resolve(__dirname, '..', 'public')))
    
    router.get('/', guiController)

    router.post('/api/grabAutoProxy', grabAutoProxyController)

    router.post('/api/grabProxyFromLinks', grabProxyFromLinksController)


module.exports = router;