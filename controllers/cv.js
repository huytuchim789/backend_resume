const { cloudinary } = require('../utils/cloudinary')
const CV = require('./../models/CV')

const addCV = async (req, res) => {
  try {
    // console.log(req.body)
    const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: 'ehwtbisx',
    })
    for (const property in req.body) {
      if (property !== 'image')
        req.body[property] = JSON.parse(req.body[property])
    }
    console.log(req.body)
    // const newCV = CV({ ...req.body, image: uploadedResponse.url })
    // newCV.save((error, data) => {
    //   if (error) return res.status(400).json({ message: error })
    // })
    // res.json({ message: 'add sucessfully' })
    CV.findOneAndUpdate(
      { 'user._id': res.locals.user_id },
      { ...req.body, image: uploadedResponse.url },
      { upsert: true, new: true, setDefaultsOnInsert: true },
      function (err, docs) {
        if (err) return res.status(400).json({ error: err })
        return res.json(docs)
      }
    )
  } catch (error) {
    console.log(error)
  }
}

const myCVs = async (req, res) => {
  try {
    CV.find({ 'user._id': res.locals.user_id }, function (err, docs) {
      if (err) return res.status(400).json({ error: err })
      return res.json(docs)
    })
  } catch (error) {
    console.log(error)
  }
}
const otherCVs = async (req, res) => {
  try {
    CV.find({ 'user._id': { $ne: res.locals.user_id } }, function (err, docs) {
      if (err) return res.status(400).json({ error: err })
      return res.json(docs)
    })
  } catch (error) {
    console.log(error)
  }
}
const getCV = async (req, res) => {
  const { email } = req.query
  if (!email) {
    return res.status(400).json({ error: 'Email cant not empty' })
  }
  try {
    CV.find({ 'user.email': email }, function (err, docs) {
      if (err) return res.status(400).json({ error: err })
      return res.json(docs)
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = { addCV, myCVs, otherCVs, getCV }
