const Album = require('../models/album')
const User = require('../models/user')
const Component = require('../models/component')
const mongoose = require('mongoose')

// ALBUM

const createAlbum = async (req, res) => {
  try {
    const album = await new Album(req.body)
    await album.save()
    return res.status(201).json({
      id: album._id
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find()
    return res.status(200).json({ albums })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params
    const album = await Album.findById(id)
    if (album) {
      return res.status(200).json({ album })
    }
    return res.status(404).send('This Album must have been moved or deleted 😭')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getAlbumByName = async (req, res) => {
  try {
    const { name } = req.params
    const album = await Album.findOne({ name })
    if (album) {
      return res.status(200).json({ album })
    }
    return res.status(404).send('This Album must have been moved or deleted 😭')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateAlbum = async (req, res) => {
  console.log(req.body)
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json(album)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Album.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Album deleted')
    }
    throw new Error('Album not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//COMPONENTS

const createComponent = async (req, res) => {
  try {
    const albumId = req.params.albumId
    const componentData = req.body
    console.log('Received component data:', componentData)
    const album = await Album.findById(albumId)

    if (!album) {
      return res.status(404).send('Album not found')
    }

    const component = await new Component({ ...componentData, album: albumId })
    console.log('Created component:', component)
    await component.save()

    album.components.push(component._id)
    await album.save()

    return res.status(201).json({ component })
  } catch (error) {
    console.error('Error creating component:', error)
    return res.status(500).json({ error: error.message })
  }
}

const getAlbumComponents = async (req, res) => {
  try {
    const albumId = req.params.albumId

    const album = await Album.findById(albumId)
    if (!album) {
      return res.status(404).send('Album not found')
    }

    const components = await Component.find({ album: albumId })

    return res.status(200).json({ components })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getComponentById = async (req, res) => {
  try {
    const albumId = req.params.albumId
    const componentId = req.params.componentId

    const album = await Album.findById(albumId)
    if (!album) {
      return res.status(404).send('Album not found')
    }

    const component = await Component.findOne({
      _id: componentId,
      album: albumId
    })

    if (!component) {
      return res.status(404).send('Component not found')
    }

    return res.status(200).json({ component })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const updateComponent = async (req, res) => {
  try {
    const albumId = req.params.albumId
    const componentId = req.params.componentId
    const componentData = req.body

    const album = await Album.findById(albumId)
    if (!album) {
      return res.status(404).send('Album not found')
    }

    const component = await Component.findOne({
      _id: componentId,
      album: albumId
    })
    if (!component) {
      return res.status(404).send('Component not found')
    }

    component.set(componentData)

    await component.save()

    return res.status(200).json({ component })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const deleteComponent = async (req, res) => {
  try {
    const albumId = req.params.albumId
    const componentId = req.params.componentId
    const album = await Album.findById(albumId)
    if (!album) {
      return res.status(404).send('Album not found')
    }

    const component = await Component.findOne({
      _id: componentId,
      album: albumId
    })
    if (!component) {
      return res.status(404).send('Component not found')
    }

    album.components.pull(componentId)
    await album.save()
    await component.deleteOne()

    return res.status(200).send('Component deleted')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// IMGUR

const addImage = async (req, res) => {
  const { imageBase64 } = req.body

  try {
    const response = await axios.post(
      'https://api.imgur.com/3/image',
      imageBase64,
      {
        headers: {
          Authorization: '16e48a88f10c212'
        }
      }
    )

    const imgurImageUrl = response.data.data.link

    return res.status(201).json({ imageUrl: imgurImageUrl })
  } catch (error) {
    console.error('Image upload to Imgur failed:', error)
    return res.status(500).json({ error: 'Image upload to Imgur failed' })
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
  createComponent,
  getAlbumComponents,
  getComponentById,
  updateComponent,
  deleteComponent,
  addImage,
  // createGrid,
  // updateGrid,
  // deleteGrid,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
