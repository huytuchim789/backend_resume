const { mailTemplate } = require('../email/email')
const nodemailer = require('nodemailer')
const axios = require('axios')
const fs = require('fs')
const moment = require('moment')
const FormData = require('form-data')

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
const updateCSV = async (req, res) => {
  try {
    // const response = await axios.get('http://127.0.0.1:8000/')
    // const now = moment().format('YYYY_MM_DD_HH_mm_ss')
    // const logStream = fs.createWriteStream(`${now}.csv`, { flags: 'w' })
    // // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
    // logStream.write(response.data.header.join(','))
    // response.data.body.forEach((d) => {
    //   logStream.write('\n')
    //   logStream.write(d.join(','))
    // })
    // logStream.end('')
    const fileInfo = {
      name: '2022_10_20_23_21_00.csv',
      mime: 'text/csv',
      size: 40565,
      parent: { id: 158951 },
    }
    fs.stat(`2022_10_20_23_21_00.csv`, async function (err, stats) {
      //Checking for errors
      if (err) {
        console.log(err)
      } else {
        try {
          //Logging the stats Object
          fileInfo.size = stats.size
          const form = new FormData()
          form.append('file', fs.createReadStream('2022_10_20_23_21_00.csv'))
          console.log(fs.createReadStream('2022_10_20_23_21_00.csv'))
          form.append('fileInfo', JSON.stringify(fileInfo))
          const res2 = await axios.post(
            'http://dashboard.dev.ulake.usth.edu.vn/api/file',
            form,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${req.body.access_token_csv}`,
              },
            }
          )
        } catch (error) {
          console.log(error)
        }
      }
    })
    res.json({})
  } catch (error) {
    console.log(error)
  }
}
module.exports = { addContact, updateCSV }
