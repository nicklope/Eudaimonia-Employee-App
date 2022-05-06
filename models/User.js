const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const User = new Schema(
  {
    userName: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    location: { type: String, required: false },
    aboutMe: { type: String, required: false },
    bloodType: { type: String, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', User)
