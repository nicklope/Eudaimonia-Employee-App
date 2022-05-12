const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const User = new Schema(
  {
    userName: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    location: { type: String, required: true },
    aboutMe: { type: String, required: true },
    coverPhoto: { type: String, default: null },
    bloodType: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    enlightenment: { type: Number, required: true, default: 0 },
    clockedIn: { type: Boolean, default: false },
    postsEnlightened: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', User)
