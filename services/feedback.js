const logger = require('winston')
const _ = require('lodash')
const Orgainsation = require('../models/organisation')

const saveComment = async (organisationName, payload) => {
  const organisationResponse = await Orgainsation.findOneAndUpdate(
    {
      name: organisationName
    },
    {
      $push: {
        comments: payload
      }
    },
    { new: true }
  )
  if (organisationResponse) {
    const message = `Organisation : ${organisationName} successfully updated`
    logger.info(message)
    return { message }
  } else {
    throw new Error(`No Organisation : ${organisationName} found`)
  }
}

const getComment = async organisationName => {
  const organisationResponse = await Orgainsation.findOne(
    { name: organisationName },
    { comments: 1, _id: 0 }
  )
  const comments = _.get(organisationResponse, 'comments')
  if (comments) {
    const message = `Found comments for Organisation : ${organisationName}`
    logger.info(message)
    return comments
  } else {
    const messgae = `No comment found for organisation : ${organisationName}`
    logger.error(`${messgae}`)
    throw new Error(`${messgae}`)
  }
}
module.exports = {
  saveComment,
  getComment
}
