import React from 'react'
import { Space, PageHeader } from 'antd'
import AppointmentForm from '../components/AppointmentForm'
import { useNavigate } from 'react-router-dom'

const CreateAppointment: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Space
      direction='vertical'
      size='middle'
      style={{ display: 'flex', marginTop: '2%' }}
    >
      <PageHeader
        className='site-page-header'
        onBack={() => navigate('/')}
        title='NEW RECORD'
      />

      <AppointmentForm />
    </Space>
  )
}

export default CreateAppointment
