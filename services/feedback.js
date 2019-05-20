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
    { name: organisationName, 'comments.active': true },
    { _id: 0, comments: 1 }
  )
  const comments = _.get(organisationResponse, 'comments')
  if (comments) {
    const message = `Found comments for Organisation : ${organisationName}`
    logger.info(message)
    return _.map(comments, feedback => {
      return { comment: feedback.comment }
    })
  } else {
    const messgae = `No comment found for organisation : ${organisationName}`
    logger.error(`${messgae}`)
    throw new Error(`${messgae}`)
  }
}

const deleteComments = async organisationName => {
  const organisationResponse = await Orgainsation.updateOne(
    {
      name: organisationName,
      'comments.active': true
    },
    {
      $set: { 'comments.$.active': false }
    }
  )
  if (!_.isEmpty(organisationResponse)) {
    const message = `Comments soft deleted for Organisation : ${organisationName}`
    logger.info(message)
    return { message }
  } else {
    const messgae = `No comment deleted for organisation : ${organisationName}`
    logger.error(`${messgae}`)
    throw new Error(`${messgae}`)
  }
}
module.exports = {
  saveComment,
  getComment,
  deleteComments
}
