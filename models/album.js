const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Album = new Schema(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
    grids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grid' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Album', Album)
