const {
  register,
  login,
  getallMovies,
  getMovies,
  newrelease,
  singleMovie,
  categorymovie,
  findShow,
  search,
  verifyNumber,
  seatBooking,
  bookedseats,
  order,
  confirmPayment,
  viewbooking,
  updaterate,
  ratingvalue
} = require('../Controllers/userControllers')
const verifyAuth = require('../Middlewares/authMiddleware')
const router = require('express').Router()

//post
router.post('/register', register)
router.post('/login', login)
router.get('/getMovies', getallMovies)
router.get('/homeMovies', getMovies)
router.get('/new-release', newrelease)
router.get('/moviedetail/:id', singleMovie)
router.get('/categorymovie/:category', categorymovie)
router.get('/findShow/:id',findShow)
router.get('/search',search)
router.post('/verifyNumber',verifyNumber)
router.post('/seatbook',verifyAuth,seatBooking)
router.post('/bookedseats',bookedseats)
router.post('/order',verifyAuth,order)
router.post('/order',verifyAuth,order)
router.post('/update-rate',verifyAuth,updaterate)
router.get('/view-booking',verifyAuth,viewbooking)
router.get('/star-ratingvalue',verifyAuth,ratingvalue)
router.post('/confirmPayment',verifyAuth,confirmPayment)

module.exports = router
