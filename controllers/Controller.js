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

    await post.save()
    await post.user.push(user._id)
    await user.save()
    res.send(post)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createPost
}
