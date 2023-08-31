const Album = require('../models/album')
const User = require('../models/user')

// ALBUM

const createCard = async (req, res) => {
  try {
    const card = await new Card(req.body)
    await card.save()
    return res.status(201).json({
      card
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find()
    return res.status(200).json({ cards })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getCardById = async (req, res) => {
  try {
    const { id } = req.params
    const card = await Card.findById(id)
    if (card) {
      return res.status(200).json({ card })
    }
    return res.status(404).send('The Card does not exist')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getCardByName = async (req, res) => {
  try {
    const { name } = req.params
    const card = await Card.findOne({ name })
    if (card) {
      return res.status(200).json({ card })
    }
    return res.status(404).send('The Card does not exist')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateCard = async (req, res) => {
  console.log(req.body)
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json(card)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Sign.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Sign deleted')
    }
    throw new Error('Sign not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// USERS

const createUser = async (req, res) => {
  try {
    const user = await new User(req.body)
    await user.save()
    return res.status(201).json({
      user
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (user) {
      return res.status(200).json({ user })
    }
    return res.status(404).send('The User does not exist')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateUser = async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await User.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('User deleted')
    }
    throw new Error('User not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  getAlbumByName,
  updateAlbum,
  deleteAlbum,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
