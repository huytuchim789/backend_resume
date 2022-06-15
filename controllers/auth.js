const { OAuth2Client } = require('google-auth-library')
const User = require('./../models/User')
const client = new OAuth2Client(process.env.REACT_APP_CLIENT_ID)
const jwt = require('jsonwebtoken')

const googleLogin = (req, res) => {
  const { tokenId } = req.body
  console.log(tokenId)
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.REACT_APP_CLIENT_ID,
    })
    .then((response) => {
      const { email_verified, name, email } = response.payload
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({ error: 'something wrong' })
          } else {
            if (user) {
              const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
                expiresIn: '7d',
              })
              const { _id, name, email, picture } = user
              res.json({
                token,
                user: { _id, name, email, picture },
              })
            } else {
              const newUser = new User(response.payload)
              newUser.save((err, data) => {
                if (err)
                  return res.status(400).json({
                    error: err,
                  })
                const token = jwt.sign({ _id: data._id }, process.env.JWT_KEY, {
                  expiresIn: '7d',
                })
                const { _id, name, email, picture } = newUser
                res.json({
                  token,
                  user: { _id, name, email, picture },
                })
              })
            }
          }
        })
      }
    })
  console.log()
}

module.exports = { googleLogin }
