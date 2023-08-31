const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Grid = new Schema(
  {
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    image5: { type: String, required: true },
    image6: { type: String, required: true },
    image7: { type: String, required: true },
    image8: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Grid', Grid)
