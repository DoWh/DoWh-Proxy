const express = require('express')
const guiRoute = require('./guiRoute')
const formRoute = require('./formRoute')
const router = express.Router()

    router.use(express.static(__appdir+'/public'))
    router.use('/', guiRoute)
    router.use('/api/startProxy', formRoute)
    // router.use('/progress', progressController)
    // router.use('/result', result)


module.exports = router;