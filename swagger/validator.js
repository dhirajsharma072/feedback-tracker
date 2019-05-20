const Validator = require('swagger-model-validator')
const swagger = require('./feedback.json')
const Constant = require('../constant')
/**
 * Validate input
 * @param {String} schema schema
 * @param {Object} parameterTobeValidate
 * @return {Object} promise
 */
const validate = (schema, parameterTobeValidate, req, res, next) => {
  const validator = new Validator(swagger) //eslint-disable-line
  const validation = swagger.validateModel(
    schema,
    parameterTobeValidate,
    false,
    true
  )
  if (validation.valid) {
    return next()
  }
  if (typeof validation.GetErrorConstants === 'function') {
    return res.status(400).send({
      status: 400,
      Constant: Constant.MESSAGES.INVALID,
      error: validation.GetErrorMessages()
    })
  }
  return res.status(400).send({
    status: 400,
    Constant: Constant.BAD_REQUEST,
    error: validation.GetErrorMessages()
  })
}

const saveComment = (req, res, next) => {
  const payload = req.body
  validate('Comment', req.body, req, res, next)
}

module.exports = {
  saveComment
}
