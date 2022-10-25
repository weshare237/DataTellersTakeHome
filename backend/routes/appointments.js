const express = require('express')
const router = express.Router()

const {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointments')

router.route('/').get(getAllAppointments).post(createAppointment)
router
  .route('/:id')
  .get(getSingleAppointment)
  .patch(updateAppointment)
  .delete(deleteAppointment)

module.exports = router
