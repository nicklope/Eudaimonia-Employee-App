const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Comment = new Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    content: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', Comment)
