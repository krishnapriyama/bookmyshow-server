const express = require('express')
const router = express.Router()
const {
  adminLogin,
  theatorAccept,
  viewTheaters,
  addMovie,
  deleteUser,
  viewUsers,
  viewMovies,
  userAction,
  deleteMovie,
  updateMovie,
  updateUser,
  updateTheater,
  addGenre,
  addLanguage,
  allGenres,
  allLanguages,
  deleteGenre,
  deletelanguage,
  updateGenre,
  updateLanguage
} = require('../Controllers/adminControllers')

//get
router.get('/view-theaters', viewTheaters)
router.get('/view-users', viewUsers)
router.get('/view-movies', viewMovies)
router.get('/all-Genres', allGenres)
router.get('/all-Languages', allLanguages)

//post
router.post('/login', adminLogin)
router.post('/useraction', userAction)
router.post('/addmovies', addMovie)
router.post('/updateMovie', updateMovie)
router.post('/updateUser', updateUser)
router.post('/updateGenre', updateGenre)
router.post('/updateLanguage', updateLanguage)
router.post('/updateTheater', updateTheater)
router.post('/add-genre', addGenre)
router.post('/add-language', addLanguage)


//patch
router.patch('/accept', theatorAccept)

//delete
router.delete('/deleteUser/:id', deleteUser)
router.delete('/deletegenre/:id', deleteGenre)
router.delete('/deletelanguage/:id', deletelanguage)
router.delete('/deleteMovie/:id', deleteMovie)

module.exports = router
