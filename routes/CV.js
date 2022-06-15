const express = require('express')

const router = express.Router()
const multer = require('multer')
const upload = multer()
const {
  //   signUp,
  //   accountActivation,
  //   signin,
  //   forgotPassword,
  //   resetPassword,
  addCV,
  myCVs,
  otherCVs,
  // getCV,
} = require('./../controllers/CV')

// router.post('/signup', signUp)
// router.post('/account-activation', accountActivation)
// router.post('/signin', signin)
// router.put('/forgot-password', forgotPassword)
// router.put('/reset-password', resetPassword)
router.post('/addCV', upload.single('image'), addCV)
router.get('/myCVs', myCVs)
router.get('/otherCVs', otherCVs)
// router.get('/getCV', getCV)
module.exports = { CVRouter: router }
