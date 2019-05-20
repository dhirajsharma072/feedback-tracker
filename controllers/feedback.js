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
const getComment = async (req, res, next) => {
  const organisationName = req.params['orgName']
  try {
    const result = await feedbackService.getComment(organisationName)
    return res.send(result)
  } catch (error) {
    logger.error(`An error occured while fetching  comments ${error.message}`)
    return next(error)
  }
}

const deleteComments = async (req, res, next) => {
  const organisationName = req.params['orgName']
  try {
    const result = await feedbackService.deleteComments(organisationName)
    return res.send(result)
  } catch (error) {
    logger.error(`An error occured while fetching  comments ${error.message}`)
    return next(error)
  }
}

module.exports = {
  saveComment,
  getComment,
  deleteComments
}
