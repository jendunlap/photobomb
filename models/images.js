const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Images = new Schema(
  {
    image1: { type: String, required: true },
    title1: { type: String, required: true },
    description1: { type: String, required: true },
    image2: { type: String, required: true },
    title2: { type: String, required: true },
    description2: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Images', Images)
