const _ = require('lodash')
const mongoose = require('mongoose')
const { Mockgoose } = require('mockgoose')
const logger = require('winston')
const feedbackService = require('../../../services/feedback')
const { organisations } = require('../../../seeds/organisation.js')
const organisation = require('../../../models/organisation')

const mockgoose = new Mockgoose(mongoose)
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
describe('Unit', () => {
  describe('Feedback Service ', () => {
    beforeAll(function cb(done) {
      process.env.MONGODB_URL = 'mongodb://localhost:27017/feebacktracker'
      mockgoose
        .prepareStorage()
        .then(() => {
          mongoose.connect(process.env.MONGODB_URL, {}, async error => {
            if (error) return done(error)
            await initSeed()
            return done()
          })
        })
        .catch(error => {
          done(error)
        })
    })

    afterAll(done => {
      mongoose.connection.close(done)
    })
    describe('saveComment', () => {
      it('should save commet when valie organisation name is being passed with valid payload', async () => {
        const payload = {
          comment: 'This is test comment'
        }
        const orgName = 'xendit'

        const response = await feedbackService.saveComment(orgName, payload)
        expect(response.message).toEqual(
          'Organisation : xendit successfully updated'
        )
      })
      it('should throw error when wrong organisation name is being passed ', async () => {
        const payload = {
          comment: 'This is test comment'
        }
        const orgName = 'invalid_org'
        try {
          await feedbackService.saveComment(orgName, payload)
        } catch (error) {
          expect(error.message).toEqual('No Organisation : invalid_org found')
        }
      })
    })
  })
})
