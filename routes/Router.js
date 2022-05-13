const router = require('express').Router()
const controller = require('../controllers/Controller')

router.get('/posts', controller.getPosts)
router.get('/comments/:postId', controller.getComments)
router.get('/user/:userId', controller.getUserData)
router.get('/posts/:userId', controller.getUserPosts)
router.post('/newpost/:id', controller.createPost)
router.post('/comment/:userId/:postId', controller.createComment)
router.delete('/comment/:id', controller.deleteComment)
router.delete('/post/:id', controller.deletePost)
router.put('/updatepost/:id', controller.updatePost)
router.put('/enlighten/:postId/:userId', controller.enlightenPost)
router.put('/unenlighten/:postId/:userId', controller.unEnlightenPost)
router.put('/cover/:id', controller.updateCoverPhoto)
router.put('/user/:id', controller.updateUser)
router.post('/token/:id', controller.createToken)
module.exports = router
