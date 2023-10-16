const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Grid = new Schema(
  {
    image1: { type: String, required: false },
    image2: { type: String, required: false },
    image3: { type: String, required: false },
    image4: { type: String, required: false },
    image5: { type: String, required: false },
    image6: { type: String, required: false },
    image7: { type: String, required: false },
    image8: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Grid', Grid)
