const mongoose = require('mongoose')
const logger = require('winston')
const organisation = require('./models/organisation')
const { organisations } = require('./seeds/organisation.js')

logger.info('Environment:', process.env.NODE_ENV)
const initSeed = async () => {
  try {
    const response = await organisation.findOne({})
    if (!(response && response.name)) {
      await organisation.insertMany(organisations)
    }
  } catch (error) {
    logger.error(`An error occured while seeding ${error.message}`)
  }
}

const initDb = () => {
  mongoose.connect(process.env.MONGODB_URL)

  mongoose.connection.on('connected', async () => {
    logger.info('DB connected ')
    await initSeed()
  })
  mongoose.connection.on('error', err => {
    logger.error('An Error while connection with mongoDB: ', err.message)
    process.exit(0)
  })

  mongoose.connection.on('disconnected', () => {
    logger.error('Mongoose db connection is disconnected')
  })
}
module.exports = {
  initDb
}
