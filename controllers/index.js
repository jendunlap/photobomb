const Album = require('../models/album')
const User = require('../models/user')
const Grid = require('../models/grid')
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
      album: componentId
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

    album.components.pull(gridId)
    await album.save()
    await component.remove()

    return res.status(200).send('Component deleted')
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// GRIDS

// const createGrid = async (req, res) => {
//   try {
//     const albumId = req.params.albumId
//     const gridData = req.body
//     const album = await Album.findById(albumId)

//     if (!album) {
//       return res.status(404).send('Album not found')
//     }

//     const grid = await new Grid({ ...gridData, album: albumId })
//     await grid.save()

//     album.grids.push(grid._id)
//     await album.save()

//     return res.status(201).json({ grid })
//   } catch (error) {
//     console.error('Error creating grid:', error)
//     return res.status(500).json({ error: error.message })
//   }
// }

// const updateGrid = async (req, res) => {
//   try {
//     const albumId = req.params.albumId
//     const gridId = req.params.gridId
//     const gridData = req.body

//     const album = await Album.findById(albumId)
//     if (!album) {
//       return res.status(404).send('Album not found')
//     }

//     const grid = await Grid.findOne({ _id: gridId, album: albumId })
//     if (!grid) {
//       return res.status(404).send('Grid not found')
//     }

//     grid.set(gridData)
//     await grid.save()

//     return res.status(200).json({ grid })
//   } catch (error) {
//     return res.status(500).json({ error: error.message })
//   }
// }

// const deleteGrid = async (req, res) => {
//   try {
//     const albumId = req.params.albumId
//     const gridId = req.params.gridId
//     const album = await Album.findById(albumId)
//     if (!album) {
//       return res.status(404).send('Album not found')
//     }

//     const grid = await Grid.findOne({ _id: gridId, album: albumId })
//     if (!grid) {
//       return res.status(404).send('Grid not found')
//     }

//     album.grids.pull(gridId)
//     await album.save()
//     await grid.remove()

//     return res.status(200).send('Grid deleted')
//   } catch (error) {
//     return res.status(500).json({ error: error.message })
//   }
// }

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
  getComponentById,
  updateComponent,
  deleteComponent,
  // createGrid,
  // updateGrid,
  // deleteGrid,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
