const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Component = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['image', 'text', 'video', 'audio', 'custom']
    },
    data: {
      image: {
        imageUrl: { type: String, required: false },
        altText: { type: String, required: false }
      },
      text: {
        text: { type: String, required: false }
      }
    },
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Component', Component)
