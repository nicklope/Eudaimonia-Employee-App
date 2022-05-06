const router = require('express').Router()
const controller = require('../controllers/Controller')

router.post('/newpost/:id', controller.createPost)
module.exports = router
