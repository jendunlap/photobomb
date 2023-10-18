const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Component = new Schema(
  {
    grids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grid' }],
    heros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    images2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Images' }],
    text: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Text' }],
    album: { type: Schema.Types.ObjectId, ref: 'Album' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Component', Component)
