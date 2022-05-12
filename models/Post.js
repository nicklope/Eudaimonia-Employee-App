const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Post = new Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    content: { type: String, required: true },
    image: { type: String, required: false },
    enlightenment: { type: Number, required: true, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', Post)
