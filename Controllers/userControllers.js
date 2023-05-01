const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const movieModels = require('../Models/movieModel')
const bcrypt = require('bcrypt')
const ShowModel = require('../Models/showModel')
const bookingModel = require('../Models/BookingModel')
const { createOrder } = require('../Config/Razorpay')

const handleErrors = (err) => {
  let errors = { email: '', password: '' }
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered'
  }

  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect'
  }

  if (err.code === 11000) {
    errors.email = 'Email is already registered'
    return errors
  }

  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

//Auth
module.exports.register = async (req, res, next) => {
  try {
    const { email, name, password, phone } = req.body
    const action = { isBlocked: false }
    const user = await userModel.create({
      email,
      name,
      phone,
      password,
      ...action,
    })
    res.json({ user: user._id, created: true })
  } catch (err) {
    console.log(err, 'Error from server,register')
    const errors = handleErrors(err)
    res.json({ errors, created: false })
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          if (user.isBlocked) {
            res.status(401).json({ error: 'user Blocked Contact admin' })
          } else if (!user.verified) {
            res.status(401).json({ error: 'user Not verified' })
          } else {
            const token = jwt.sign({ email }, 'SuperSecretKey')
           
            res.json({ created: true, token })
          }
        } else {
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
          res.json({ error: 'Invalid email or password' })
          console.log('Passwords do not match.')
        }
      })
    } else {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.json({ error: 'Invalid email or password' })
    }
  } catch (error) {
    console.log(error)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.send(error)
  }
}

//get
module.exports.getallMovies = async (req, res, next) => {
  try {
    movieModels
      .find({})
      .then((resp) => {
        res.json(resp)
      })
      .catch((err) => {
        res.json(err)
      })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.getMovies = async (req, res, next) => {
  try {
    movieModels
      .find({})
      .limit(10)
      .then((resp) => {
        res.json(resp)
      })
      .catch((err) => {
        res.json(err)
      })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.newrelease = async (req, res, next) => {
  try {
    const currentDate = new Date()
    movieModels
      .find({ releasedate: { $gte: currentDate } })
      .sort({ releasedate: 1 })
      .limit(6)
      .then((resp) => {
        res.json(resp)
      })
      .catch((err) => {
        res.json(err)
      })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.singleMovie = async (req, res, next) => {
  try {
    movieModels.findOne({ _id: req.params.id }).then((resp) => {
      res.json(resp)
    })
  } catch (error) {}
}

module.exports.categorymovie = async (req, res, next) => {
  try {
    var category = req.params.category
    movieModels.find({ genre: category }).then((resp) => {
      res.json(resp)
    })
  } catch (error) {}
}

module.exports.findShow = async (req, res, next) => {
  const id = req.params.id
  try {
    ShowModel.find({ 'Movie._id': id }).then((resp) => {
      res.status(200).send(resp)
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.search = async (req, res, next) => {
  let key = req.query.key.toLowerCase()
  const limit = req.query.limit
  try {
    const resp = await movieModels
      .find({ moviename: { $regex: new RegExp(key, 'i') } })
      .limit(Number(limit))
    res.status(200).send(resp)
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occurred while processing the request')
  }
}

module.exports.verifyNumber = async (req, res, next) => {
  let number = req.body.number.split('+91')[1]
  userModel
    .updateOne({ phone: number }, { $set: { verified: req.body.verified } })
    .then((resp) => {
      if (resp.matchedCount > 0) {
        res.status(200).send({ verified: true, resp })
      } else if (resp.modifiedCount == 0 || resp.matchedCount == 0) {
        res.status(200).send({ err: 'Not Verified', resp })
      }
    })
    .catch((err) => {
      res.status(200).send(err)
    })
}

module.exports.seatBooking = async (req, res, next) => {
  const { email } = req.user
  try {
    bookingModel
      .create({
        BookingDate: req.body.BookingDate.split('T')[0],
        CompletPayment: false,
        user: {
          email: email,
        },
        show: {
          date: req.body.show.date.split('T')[0],
          time: req.body.show.time,
          SeatNumber: req.body.show.SeatNumber,
          price: req.body.show.price,
          TotelPrice: req.body.show.TotelPrice,
        },
        movie: req.body.movie,
        theater: req.body.theater,
      })
      .then((resp) => {
        res.status(200).send(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}

module.exports.bookedseats = async (req, res, next) => {
  try {
    const date = req.body.date.split('T')[0]
    let screenseats = await ShowModel.findOne(
      { 'theater.screen._id': req.body.screen_id },
      { 'theater.screen': true },
    )
    bookingModel
      .find(
        {
          'show.date': new Date(date),
          'show.time': req.body.time,
          'theater.screen._id': req.body.screen_id,
        },
        { show: true, theater: true },
      )
      .then((resp) => {
        let seats = []
        resp.map((value) => {
          seats.push(...value.show.SeatNumber)
        })
        res.status(200).send({ seats, screenseats })
      })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.order = async (req, res, next) => {
  const { email } = req.user
  const { amount } = req.body
  const order = await createOrder(amount)
  order.userEmail = email
  order.userName = email.split('@')[0]
  res.send(order)
}

module.exports.confirmPayment = async (req, res, next) => {
  const { email } = req.user
  const details = await bookingModel.find({ 'user.email': email })
  bookingModel
    .updateOne({ _id: req.body.bookingid }, { CompletPayment: true })
    .then((response) => {
      res.status(200).send({ response, details })
    })
}

module.exports.viewbooking = async (req, res, next) => {
  const { email } = req.user
  const user = await userModel.find({ email: email })
  bookingModel.find({ 'user.email': email }).then((show) => {
    res.status(200).send({ show, user })
  })
}

module.exports.updaterate = async (req, res, next) => {
  const { email } = req.user
  const { moviename, rating } = req.body

  try {
    const user = await userModel.findOne({ email: email })

    if (!user.ratings) {
      await userModel.updateOne({ email: email }, { $set: { ratings: [] } })
    }

    const movieIndex = user.ratings.findIndex((r) => r.moviename === moviename)

    if (movieIndex !== -1) {
      user.ratings[movieIndex].value = rating
    } else {
      user.ratings.push({ moviename: moviename, value: rating })
    }
    await user.save()

    res.status(200).send(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}


module.exports.ratingvalue = async (req, res, next) => {
  const { email } = req.user;
  const { movieName } = req.query;

  try {
    const user = await userModel.findOne({ email, 'ratings.moviename': movieName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const rating = user.ratings.find((rating) => rating.moviename === movieName);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
};
