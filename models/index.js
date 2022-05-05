const mongoose = require('mongoose')
const UserSchema = require('./User')
const PostSchema = require('./Post')
const CommentSchema = require('./Comment')

const User = mongoose.model('User', UserSchema)
const Post = mongoose.model('Post', PostSchema)
const Comment = mongoose.model('Comment', CommentSchema)
module.exports = {
  User,
  Post,
  Comment
}
