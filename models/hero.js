const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Hero = new Schema(
  {
    image: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Hero', Hero)
