const mongoose = require('mongoose')
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
      console.log('connect  db successfully')
    })
    .catch((err) => {
      console.log(err)
    })
}
module.exports = connectDB
