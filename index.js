const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./Routes/UserRoutes')
const Theater = require('./Routes/theaterRoutes')
const Admin = require('./Routes/adminRoutes')
const app = express()

const cookieParser = require('cookie-parser')

app.use(
  cors({
    origin: [
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3002',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'https://charming-pasca-2f9998.netlify.app',
      'https://unique-madeleine-0563d5.netlify.app',
      'https://jolly-sable-ed07de.netlify.app'
    ],
    method: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  }),
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const url = 'mongodb+srv://krishnapriyama185:AS4UtDXk1Yjf9vJI@cluster0.p8d9dql.mongodb.net/bookmyticket'

mongoose

  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Sucessfully Installed')
  })
  .catch((err) => {
    console.log(err.message)
  })

app.listen(4000, () => {
  console.log('Server Started on Port 4000')
})

app.use(express.json())
app.use(cookieParser())


app.use('/', authRoutes)
app.use('/theater', Theater)
app.use('/admin', Admin)
