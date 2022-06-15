const express = require('express')

const router = express.Router()

const {
  //   signUp,
  //   accountActivation,
  //   signin,
  //   forgotPassword,
  //   resetPassword,
  addContact,
} = require('./../controllers/contact')

// router.post('/signup', signUp)
// router.post('/account-activation', accountActivation)
// router.post('/signin', signin)
// router.put('/forgot-password', forgotPassword)
// router.put('/reset-password', resetPassword)
router.post('/contact', addContact)
module.exports = { contactRouter: router }
