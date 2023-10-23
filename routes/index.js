const { Router } = require('express')
const controllers = require('../controllers')
// const middleware = require('../middleware')
const router = Router()

router.get('/', (req, res) => res.send('HEYYOOOO ROOT ROUTE!'))

router.get('/albums', controllers.getAllAlbums)

router.post('/albums', controllers.createAlbum)

router.get('/albums/:id', controllers.getAlbumById)

router.get('/albums/:name', controllers.getAlbumByName)

router.put('/albums/:id', controllers.updateAlbum)

router.delete('/albums/:id', controllers.deleteAlbum)

router.post('/albums/:albumId/components', controllers.createComponent)

router.get(
  '/albums/:albumId/components/:componentId',
  controllers.getComponentById
)

router.put(
  '/albums/:albumId/components/:componentId',
  controllers.updateComponent
)

router.delete(
  '/albums/:albumId/components/:componentId',
  controllers.deleteComponent
)

// router.post('/albums/:albumId/grids', controllers.createGrid)

// router.put('/albums/:albumId/grids/:gridId', controllers.updateGrid)

// router.delete('/albums/:albumId/grids/:gridId', controllers.deleteGrid)

router.post('/users', controllers.createUser)

router.get('/users', controllers.getAllUsers)

router.get('/users/:id', controllers.getUserById)

// router.put(
//   '/users/:id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controllers.updateUser
// )

// router.delete(
//   '/users/:id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controllers.deleteUser
// )

module.exports = router
