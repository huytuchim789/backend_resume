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
const cors = require('cors')

connectDB()
const PORT = 3001 || process.env.PORT
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// support parsing of application/json type post data
app.use(bodyParser.json())
app.use(cors(corsOptions))

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/api', authRouter)
app.get('/api/getCV', getCV)
app.use('/api', contactRouter)
app.use(verifyMiddleware)
app.use('/api', CVRouter)

app.listen(PORT, () => {
  console.log('run')
})
