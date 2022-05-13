const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const PartnerToken = new Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    used: [{ type: Boolean, required: true, default: false }],
    token: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('PartnerToken', PartnerToken)
