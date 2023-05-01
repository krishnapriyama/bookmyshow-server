const MovieModel = require('../Models/movieModel')
const TheaterModel = require('../Models/theaterModel')
const AdminModel = require('../Models/adminModel')
const bcrypt = require('bcrypt')
const userModel = require('../Models/userModel')
const genreModel = require('../Models/genreModel')
const languageModel = require('../Models/languageModel')
const jwt = require('jsonwebtoken')
const moment = require('moment')

//Login
module.exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const admin = await AdminModel.findOne({ email })
    if (admin) {
      bcrypt.compare(password, admin.password, function (err, result) {
        if (result === true) {
          const token = jwt.sign({ email }, 'SuperSecretKey')
          res.json({ created: true, token })
        } else {
          res.json({ error: 'Invalid email or password' })
          console.log('Passwords do not match.')
        }
      })
    } else {
      res.json({ error: 'Invalid email or password' })
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

//List Details
module.exports.viewTheaters = async (req, res, next) => {
  try {
    TheaterModel.find({}, { password: 0 }).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.viewUsers = async (req, res, next) => {
  try {
    userModel.find({}, { password: 0 }).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.viewMovies = async (req, res, next) => {
  try {
    MovieModel.find({}).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.allGenres = async (req, res, next) => {
  try {
    genreModel.find({}).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.allLanguages = async (req, res, next) => {
  try {
    languageModel.find({}).then((response) => {
      res.json(response)
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

//Add Details
module.exports.addMovie = async (req, res, next) => {
  try {
    const {
      moviename,
      releasedate,
      description,
      poster1,
      poster2,
      poster3,
      trailerlink,
      genre,
      language,
    } = req.body

    const Movie = {
      moviename: moviename,
      releasedate: releasedate,
      description: description,
      poster1: poster1,
      poster2: poster2,
      poster3: poster3,
      genre: genre,
      language: language,
      trailerlink: trailerlink,
    }

    MovieModel.create(Movie).then((resp) => {
      res.send({ msg: 'Movie Added successfully' })
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.addGenre = async function (req, res, next) {
  try {
    const { genre } = req.body
    const newGenre = await genreModel.create({ genre })
    res.status(201).json({ msg: 'Genre added successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports.addLanguage = async function (req, res, next) {
  try {
    const { language } = req.body
    const newLan = await languageModel.create({ language })
    res.status(201).json({ msg: 'Genre added successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

//Delete
module.exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    await userModel.findByIdAndDelete(userId)
    res.send({ msg: 'deleted' })
  } catch (error) {
    res.status(404).send(error)
  }
}
module.exports.deleteGenre = async (req, res, next) => {
  try {
    const genreId = req.params.id
    await genreModel.findByIdAndDelete(genreId)
    res.send({ msg: 'deleted' })
  } catch (error) {
    res.status(404).send(error)
  }
}
module.exports.deletelanguage = async (req, res, next) => {
  try {
    const languageId = req.params.id
    await languageModel.findByIdAndDelete(languageId)
    res.send({ msg: 'deleted' })
  } catch (error) {
    res.status(404).send(error)
  }
}
module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id
    await MovieModel.findByIdAndDelete(movieId)
    res.json({ msg: 'Movie deleted' })
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}

//Authorise
module.exports.theatorAccept = async (req, res, next) => {
  try {
    const { email, action } = await req.body
    TheaterModel.findOneAndUpdate({ email: email }, { accepted: action })
      .then((resp) => {
        res.send(resp)
      })
      .catch((err) => {
        res.send(err)
      })
  } catch (error) {
    res.send(error)
  }
}

module.exports.userAction = async (req, res, next) => {
  try {
    const { email, action } = await req.body
    userModel
      .findOneAndUpdate({ email: email }, { isBlocked: action })
      .then((resp) => {
        res.send(resp)
      })
      .catch((err) => {
        res.send(err)
      })
  } catch (error) {
    res.send(error)
  }
}

//Edit

module.exports.updateMovie = async (req, res, next) => {
  const {
    _id,
    moviename,
    releasedate,
    description,
    trailerlink,
    genre,
    language,
  } = req.body
  try {
    MovieModel.updateOne(
      { _id: _id },
      {
        $set: {
          moviename: moviename,
          releasedate: new Date(releasedate),
          description: description,
          trailerlink: trailerlink,
          genre: genre,
          language: language,
        },
      },
    ).then((resp) => {
      res.send({ msg: 'movie updated' })
    })
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports.updateUser = async (req, res, next) => {
  const { _id, phone, email } = req.body
  try {
    userModel
      .updateOne({ _id: _id }, { phone: phone, email: email })
      .then((resp) => {
        res.send(resp)
      })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

module.exports.updateGenre = async (req, res, next) => {
  const { _id, genre } = req.body
  try {
    genreModel.updateOne({ _id: _id }, { genre: genre }).then((resp) => {
      res.send({ msg: `Genre updated` })
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}
module.exports.updateLanguage = async (req, res, next) => {
  const { _id, language } = req.body
  try {
    languageModel
      .updateOne({ _id: _id }, { language: language })
      .then((resp) => {
        res.send(resp)
      })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

module.exports.updateTheater = async (req, res, next) => {
  const { _id, theatername, place } = req.body
  try {
    TheaterModel.updateOne(
      { _id: _id },
      { name: theatername, place: place },
    ).then((resp) => {
      res.send({ msg: `theater updated` })
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}
