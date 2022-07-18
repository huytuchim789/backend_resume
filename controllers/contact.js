const { mailTemplate } = require('../email/email')
const nodemailer = require('nodemailer')

const addContact = async (req, res) => {
  const { fromEmail, toEmail, name, message } = req.body
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.USER_GMAIL, // generated ethereal user
      pass: process.env.USER_PWD, // generated ethereal password
    },
  })
  console.log(fromEmail, toEmail)
  res.header('Access-Control-Allow-Origin', '*')
  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: process.env.USER_GMAIL, // sender address
      to: toEmail, // list of receivers
      subject: 'Message✔', // Subject line
      html: mailTemplate(name, fromEmail, message), // html body
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.json({})
  } catch (error) {
    res.status(400).json({ err: error })
  }
}
module.exports = { addContact }
