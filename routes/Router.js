const router = require('express').Router()
const controller = require('../controllers/Controller')

router.get('/posts', controller.getPosts)
router.get('/comments/:postId', controller.getComments)
router.post('/newpost/:id', controller.createPost)
router.post('/comment/:userId/:postId', controller.createComment)
router.delete('/comment/:id', controller.deleteComment)
module.exports = router
