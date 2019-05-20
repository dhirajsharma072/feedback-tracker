const Orgainsation = require('../models/organisation')
const logger = require('winston')

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

module.exports = {
  saveComment
}
