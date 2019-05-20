const express = require('express')
const swaggerUi = require('swagger-ui-express')
const templateSwagger = require('../swagger/feedback.json')
const feedbackController = require('../controllers/feedback')
const router = express.Router()
const validator = require('../swagger/validator')

router.use('/docs', swaggerUi.serve, swaggerUi.setup(templateSwagger))

router.post(
  '/orgs/:orgName/comments',
  //   validator.saveComment,
  feedbackController.saveComment
)
module.exports = router
