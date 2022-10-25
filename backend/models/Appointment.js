const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  uniqueCode: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  isFirstTime: {
    type: String,
  },
  aptDate: {
    type: Date,
    require: [true, 'Please provide appointment date'],
  },
  age: {
    type: String,
  },
  sex: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not supported',
    },
  },
  status: {
    type: String,
    enum: {
      values: ['passed', 'missed', 'rescheduled', 'pending'],
      message: '{VALUE} is not supported',
    },
    default: 'pending',
  },
  beforeApt: {
    type: String,
  },
  afterApt: {
    type: String,
  },
  requestDate: {
    type: Date,
  },
  aptTime: {
    type: Date,
  },
  city: {
    type: String,
  },
})

module.exports = mongoose.model('Appointment', AppointmentSchema)
