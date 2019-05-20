const mongoose = require('mongoose')

const { Schema } = mongoose

const organisation = {
  name: { type: String, unique: true },
  description: String,
  address: String,
  comments: [{}],
  members: [
    {
      name: String,
      avtar_url: String,
      followers: Number,
      following: Number
    }
  ],
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
}

const organisationSchema = new Schema(organisation, {
  title: 'organisation'
})

module.exports = mongoose.model('organisation', organisationSchema)
