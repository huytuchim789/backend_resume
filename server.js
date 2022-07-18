const express = require('express')
const app = express()
const { authRouter } = require('./routes/auth')
const { CVRouter } = require('./routes/CV')
const { contactRouter } = require('./routes/contact')
const router = require('./routes/auth')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./db/connectDB')
const verifyMiddleware = require('./middlewares/verify')
require('dotenv').config()
const { getCV } = require('./controllers/cv')

connectDB()
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

// const corsOptions = {
//   origin: [
//     'https://resume-frontend-12321.herokuapp.com/',
//     'http://localhost:3000/',
//   ],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// }

// support parsing of application/json type post data
app.use(bodyParser.json())
app.use(cors())
// app.use(cors(corsOptions))
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, X-Requested-With'
//   )
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   next()
// })
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', authRouter)
app.get('/api/getCV', getCV)
app.use('/api', contactRouter)
app.use(verifyMiddleware)
app.use('/api', CVRouter)

app.listen(PORT, HOST, () => {
  console.log(`run on ${PORT} ${HOST}`)
})
