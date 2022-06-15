const express = require('express')

const router = express.Router()

const {
  //   signUp,
  //   accountActivation,
  //   signin,
  //   forgotPassword,
  //   resetPassword,
  googleLogin,
} = require('./../controllers/auth')

// router.post('/signup', signUp)
// router.post('/account-activation', accountActivation)
// router.post('/signin', signin)
// router.put('/forgot-password', forgotPassword)
// router.put('/reset-password', resetPassword)
router.post('/googleLogin', googleLogin)
module.exports = { authRouter: router }
