const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const PartnerToken = require('../models/PartnerToken')
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
    const user = await User.find({ _id: userId }).populate('partnerToken')

    res.send(user)
  } catch (error) {}
}
const getFriendRequestData = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.find({ _id: userId }).populate(
      'receivedFriendRequests'
    )

    res.send(user)
  } catch (error) {}
}
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findOne({ _id: userId }).populate('posts')
    res.send(user.posts)
  } catch (error) {}
}
const enlightenPost = async (req, res) => {
  try {
    const userId = req.params.userId
    const postId = req.params.postId
    const user = await User.findOne({ _id: userId })
    const post = await Post.findOne({ _id: postId })
    const poster = await User.findOne({ _id: post.user[0] })
    const updatePost = await Post.updateOne(
      { _id: postId },
      {
        $inc: {
          enlightenment: +1
        }
      }
    )
    const updateUser = await User.updateOne(
      { _id: poster._id },
      {
        $inc: {
          enlightenment: +1
        }
      }
    )

    user.postsEnlightened.push(postId)

    user.save()
    return res.status(200).json({ updatePost, updateUser })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const unEnlightenPost = async (req, res) => {
  try {
    const userId = req.params.userId
    const postId = req.params.postId
    const post = await Post.findOne({ _id: postId })
    const poster = await User.findOne({ _id: post.user[0] })
    const updatePost = await Post.updateOne(
      { _id: postId },
      {
        $inc: {
          enlightenment: -1
        }
      }
    )
    const user = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          postsEnlightened: postId
        }
      }
    )
    const updateUser = await User.updateOne(
      { _id: poster._id },
      {
        $inc: {
          enlightenment: -1
        }
      }
    )

    return res.status(200).json({ updatePost, user, updateUser })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const updateCoverPhoto = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.updateOne(
      { _id: id },
      {
        $set: {
          coverPhoto: req.body.coverPhoto
        }
      }
    )
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const post = await User.updateOne(
      { _id: id },
      {
        $set: {
          coverPhoto: req.body.coverPhoto,
          avatar: req.body.avatar,
          userName: req.body.userName,
          aboutMe: req.body.aboutMe
        }
      }
    )
    return res.status(200).json({ post })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const createToken = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
    const partnerToken = await new PartnerToken(req.body)
    user.partnerToken = []
    user.partnerToken.push(partnerToken._id)
    partnerToken.token = Math.floor(Math.random() * (999999 - 100000) + 100000)
    await partnerToken.user.push(user._id)
    await partnerToken.save()
    await user.save()
    res.send(partnerToken)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const clockIn = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.updateOne(
      { _id: id },
      {
        $set: {
          clockedIn: true
        }
      }
    )
    res.send(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const clockOut = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.updateOne(
      { _id: id },
      {
        $set: {
          clockedIn: false
        }
      }
    )
    res.send(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const sendFriendRequest = async (req, res) => {
  try {
    const { id } = req.params
    const { friendId } = req.params
    const user = await User.findOne({ _id: id })
    const friend = await User.findOne({ _id: friendId })
    const notify = await User.updateOne(
      { _id: friendId },
      {
        $set: {
          notification: true
        }
      }
    )
    user.sentFriendRequests.push(friendId)
    friend.receivedFriendRequests.push(id)
    user.save()
    friend.save()
    res.send(notify)
  } catch (error) {}
}
const declineFriendRequest = async (req, res) => {
  try {
    const { id } = req.params
    const { friendId } = req.params
    const user = await User.findOne({ _id: id })
    const friend = await User.findOne({ _id: friendId })
    user.receivedFriendRequests = user.receivedFriendRequests.filter(
      (request) => request === friend._id
    )
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (request) => request === user._id
    )
    user.save()
    friend.save()
    res.send(user)
  } catch (error) {}
}

const addFriend = async (req, res) => {
  try {
    const { id } = req.params
    const { friendId } = req.params
    const user = await User.findOne({ _id: id })
    const friend = await User.findOne({ _id: friendId })
    user.friends.push(friend._id)
    friend.friends.push(user._id)
    user.receivedFriendRequests = user.receivedFriendRequests.filter(
      (request) => request === friend._id
    )
    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (request) => request === user._id
    )
    user.save()
    friend.save()
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
  getUserData,
  enlightenPost,
  unEnlightenPost,
  getUserPosts,
  updateCoverPhoto,
  updateUser,
  createToken,
  clockIn,
  clockOut,
  addFriend,
  sendFriendRequest,
  declineFriendRequest,
  getFriendRequestData
}
