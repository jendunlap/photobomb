const { Router } = require('express')
// const controllers = require('../controllers')
// const middleware = require('../middleware')
const router = Router()

router.get('/', (req, res) => res.send('HEYYOOOO ROOT ROUTE!'))

router.get('/albums', controllers.getAllAlbums)

router.post('/albums', controllers.createAlbum)

router.get('/albumss/:id', controllers.getAlbumById)

router.get('/albums/:name', controllers.getAlbumByName)

router.put('/albums/:id', controllers.updateAlbum)

router.delete('/albums/:id', controllers.deleteAlbum)

router.post('/users', controllers.createUser)

router.get('/users', controllers.getAllUsers)

router.get('/users/:id', controllers.getUserById)

router.put(
  '/users/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.updateUser
)

router.delete(
  '/users/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.deleteUser
)

module.exports = router
