const express = require('express')
const controller = require('../../controllers/controllersv1')
const router = express.Router()

router.post('/getOneDocument', controller.getDocuments)
router.get('/getAllDocuments', controller.getAllDocuments)

module.exports = router