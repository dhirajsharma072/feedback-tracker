const logger = require('winston')
const feedbackService = require('../services/feedback')

const saveComment = async (req, res, next) => {
  const organisationName = req.params['orgName']
  const payload = req.body
  try {
    const result = await feedbackService.saveComment(organisationName, payload)
    return res.send(result)
  } catch (error) {
    logger.error(`An error occured while saving comment ${error.message}`)
    return next(error)
  }
}

module.exports = {
  saveComment
}
