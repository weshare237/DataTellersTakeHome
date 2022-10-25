const Appointment = require('../models/Appointment')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const createAppointment = async (req, res) => {
  const appointment = await Appointment.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ appointment })
}

const getSingleAppointment = async (req, res) => {
  const { id: appointmentId } = req.params

  const appointment = await Appointment.findOne({ _id: appointmentId })

  if (!appointment) {
    throw new NotFoundError(`No appointment with id ${appointmentId}`)
  }
  res.status(StatusCodes.OK).json({ appointment })
}

const getAllAppointments = async (req, res) => {
  let result = Appointment.find({})

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const appointments = await result

  const apts = await Appointment.find({})

  const total = apts.length

  let totalMissed = apts.filter(
    (appointment) => appointment.status === 'missed'
  ).length

  totalMissed = totalMissed < 10 ? '0' + totalMissed.toString() : totalMissed

  let totalRescheduled = apts.filter(
    (appointment) => appointment.status === 'rescheduled'
  ).length

  totalRescheduled =
    totalRescheduled < 10 ? '0' + totalRescheduled.toString() : totalRescheduled

  let totalPassed = apts.filter(
    (appointment) => appointment.status === 'passed'
  ).length

  totalPassed = totalPassed < 10 ? '0' + totalPassed.toString() : totalPassed

  res
    .status(StatusCodes.OK)
    .json({ appointments, total, totalMissed, totalPassed, totalRescheduled })
}

const updateAppointment = async (req, res) => {
  const { id: appointmentId } = req.params

  const appointment = await Appointment.findOneAndUpdate(
    { _id: appointmentId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!appointment) {
    throw new NotFoundError(`No appointment with id ${appointmentId}`)
  }
  res.status(StatusCodes.OK).json({ appointment })
}

const deleteAppointment = async (req, res) => {
  const { id: appointmentId } = req.params

  const appointment = await Appointment.findOneAndDelete({
    _id: appointmentId,
  })

  if (!appointment) {
    throw new NotFoundError(`No appointment with id ${appointmentId}`)
  }

  res.status(StatusCodes.OK).json({ id: appointment.id })
}

module.exports = {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
}
