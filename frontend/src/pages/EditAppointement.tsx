import React from 'react'
import { Space, PageHeader } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import EditForm from '../components/EditForm'
import { RootState } from '../store'
import { useSelector } from 'react-redux'

const EditAppointment: React.FC = () => {
  const navigate = useNavigate()

  const { id } = useParams()

  const { appointmentsList } = useSelector(
    (state: RootState) => state.appointments
  )

  const appointment = appointmentsList.find(
    (appointment: Appointment) => appointment.key === id
  )

  return (
    <Space
      direction='vertical'
      size='middle'
      style={{ display: 'flex', marginTop: '2%' }}
    >
      <PageHeader
        className='site-page-header'
        onBack={() => navigate('/')}
        title='EDIT RECORD'
      />

      <EditForm appointment={appointment} />
    </Space>
  )
}

export default EditAppointment
