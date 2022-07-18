const mongoose = require('mongoose')
const { Schema } = mongoose

const CVSchema = new Schema({
  user: Object,
  image: String,
  about: Object,
  educationList: Array,
  projects: Array,
  skills: Array,
  theme: String,
  workList: Array,
  personality: Object,
})
const CV = mongoose.model('CV', CVSchema)
module.exports = CV
