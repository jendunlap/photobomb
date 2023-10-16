const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Album = new Schema(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
    grids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grid' }],
    heros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    images2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Images' }],
    text: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Text' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Album', Album)
