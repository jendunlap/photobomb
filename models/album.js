const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Album = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Album', Album)
