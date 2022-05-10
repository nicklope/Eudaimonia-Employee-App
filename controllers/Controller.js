const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const { updateOne, where } = require('../models/User')

const createPost = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
    const post = await new Post(req.body)
    user.posts.push(post._id)

    await post.user.push(user._id)
    await post.save()
    await user.save()
    res.send(post)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const createComment = async (req, res) => {
  try {
    const userId = req.params.userId
    const postId = req.params.postId

    const user = await User.findOne({ _id: userId })
    const post = await Post.findOne({ _id: postId })
    const comment = await new Comment(req.body)

    user.comments.push(comment._id)

    await post.comments.push(comment._id)
    await comment.post.push(post._id)
    await comment.user.push(user._id)
    await post.save()
    await user.save()
    await comment.save()
    res.send(comment)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user').populate('comments')

    console.log(posts.data)
    res.send(posts)
  } catch (error) {}
}
const getComments = async (req, res) => {
  try {
    const { postId } = req.params
    const comments = await Comment.find({ post: postId }).populate('user')
    res.send(comments)
  } catch (error) {}
}
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Comment.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Recipe deleted')
    }
    throw new Error('Comment not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Post.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Recipe deleted')
    }
    throw new Error('Post not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.updateOne(
      { _id: id },
      {
        $set: {
          content: req.body.content
        }
      }
    )
    return res.status(200).json({ post })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const getUserData = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.find({ _id: userId })
    res.send(user)
  } catch (error) {}
}
module.exports = {
  createPost,
  getPosts,
  createComment,
  getComments,
  deleteComment,
  deletePost,
  updatePost,
  getUserData
}
