const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Album = new Schema(
  {
    name: { type: String, required: false },
    image: { type: String, required: false },
    components: [
      {
        type: String,
        data: String,
        album: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Album'
        }
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Album', Album)
