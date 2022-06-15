const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  iss: String,
  azp: String,
  aud: String,
  sub: String,
  email: String,
  email_verified: Boolean,
  at_hash: String,
  name: String,
  picture: String,
  given_name: String,
  family_name: String,
  locale: String,
  iat: Number,
  exp: Number,
  jti: String,
})
const User = mongoose.model('User', UserSchema)
module.exports = User
