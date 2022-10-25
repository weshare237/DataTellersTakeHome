import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  TimePicker,
} from 'antd'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Typography } from 'antd'

import './Style.css'
import { useDispatch } from 'react-redux'
import { updateAppointment } from '../features/appointments/appointmentsSlice'
import { AppDispatch } from '../store'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const { Title } = Typography

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

interface Props {
  appointment: Appointment | any
}

const EditForm: React.FC<Props> = ({ appointment }) => {
  const [form] = Form.useForm()

  const dispatch = useDispatch<AppDispatch>()

  const dateFormat = 'YYYY/MM/DD'

  const onFinish = (values: Appointment) => {
    console.log('Received values of form: ', [values, appointment.key])

    dispatch(updateAppointment([values, appointment.key]))

    navigate('/')
  }

  const navigate = useNavigate()

  const [phone, setPhone] = useState<string>('')

  const aptTime = new Date(appointment.aptTime).toTimeString().split(' ')[0]

  return (
    <>
      <Title level={4}>General Information</Title>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        scrollToFirstError
        layout='inline'
        initialValues={{
          name: appointment.name,
          uniqueCode: appointment.uniqueCode,
          phone: appointment.phone,
          sex: appointment.sex,
          email: appointment.email,
          beforeApt: appointment.beforeApt,
          city: appointment.city,
          address: appointment.address,
          aptDate: moment(appointment.aptDate),
          requestDate: moment(appointment.requestDate),
          aptTime: moment(aptTime, 'HH:mm:ss'),
          afterApt: appointment.afterApt,
        }}
      >
        {/* General information */}
        <Form.Item
          className='input'
          name='uniqueCode'
          label='Unique Code'
          rules={[
            {
              type: 'string',
              message: 'The input is not valid code!',
            },
            {
              required: true,
              message: 'Please provide code!',
            },
          ]}
          style={{ width: '20%' }}
        >
          <Input style={{ borderRadius: '8px' }} />
        </Form.Item>

        <Form.Item
          className='input'
          name='name'
          label='Name'
          rules={[
            {
              required: true,
              message: 'Please provide name',
            },
          ]}
        >
          <Input style={{ borderRadius: '8px' }} />
        </Form.Item>

        <Form.Item
          className='input'
          name='sex'
          label='Sex'
          rules={[{ required: true, message: 'Please select sex!' }]}
        >
          <Select
            placeholder='select your gender'
            style={{ borderRadius: '8px' }}
          >
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
            <Option value='other'>Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className='input'
          name='phone'
          label='Phone'
          rules={[
            {
              required: true,
              message: 'Please provide phone number',
            },
          ]}
        >
          <PhoneInput
            country={'cm'}
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />
        </Form.Item>

        <Form.Item
          className='input'
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input style={{ borderRadius: '8px' }} />
        </Form.Item>
        <Divider style={{ borderWidth: 2, borderColor: 'black' }} />
        {/* Appointment information */}
        <Title level={4} style={{ width: '100%' }}>
          Appointement Information
        </Title>

        <Form.Item
          className='input'
          name='aptDate'
          label='App. Date'
          rules={[
            {
              type: 'date',
              message: 'The input is not valid date!',
            },
            {
              required: true,
              message: 'Please provide appointement date!',
            },
          ]}
        >
          <DatePicker format={dateFormat} style={{ borderRadius: '8px' }} />
        </Form.Item>

        <Form.Item
          className='input'
          name='isFirstTime'
          label='First Time'
          initialValue={appointment.isFirstTime}
          rules={[
            {
              required: true,
              message: 'Please provide first time',
            },
          ]}
        >
          <Select
            placeholder='Is it your first time?'
            style={{ borderRadius: '8px' }}
          >
            <Option value='yes'>Yes</Option>
            <Option value='no'>No</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className='input'
          name='requestDate'
          label='Request Date'
          rules={[{ required: true, message: 'Please provide request date!' }]}
        >
          <DatePicker format={dateFormat} style={{ borderRadius: '8px' }} />
        </Form.Item>

        <Form.Item
          className='input'
          name='status'
          label='App. Status'
          initialValue={appointment.status}
          rules={[
            {
              required: true,
              message: 'Please provide status!',
            },
          ]}
        >
          <Select placeholder='Select status'>
            <Option value='pending'>Pending</Option>
            <Option value='missed'>Missed</Option>
            <Option value='passed'>Passed</Option>
            <Option value='rescheduled'>Rescheduled</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className='input'
          name='aptTime'
          label='App. Time'
          rules={[
            {
              required: true,
              message: 'Please provide time!',
            },
          ]}
        >
          <TimePicker style={{ borderRadius: '8px' }} />
        </Form.Item>

        {/* Address information */}
        <Title level={4} style={{ width: '100%', marginTop: '2%' }}>
          Address Information
        </Title>
        <Form.Item
          className='input'
          name='address'
          label='Address 1'
          rules={[
            {
              required: true,
              message: 'Please provide address',
            },
          ]}
        >
          <Input style={{ borderRadius: '8px' }} />
        </Form.Item>
        <Form.Item
          className='input'
          name='city'
          label='City'
          rules={[
            {
              required: true,
              message: 'Please provide city',
            },
          ]}
        >
          <Input style={{ borderRadius: '8px' }} />
        </Form.Item>

        {/* Notes */}
        <Title level={4} style={{ width: '100%', marginTop: '2%' }}>
          Notes
        </Title>

        <Form.Item
          className='input'
          name='beforeApt'
          label='Before Appointment'
          rules={[
            {
              required: true,
              message: 'Please provide city',
            },
          ]}
        >
          <Input.TextArea style={{ borderRadius: '8px' }} />
        </Form.Item>

        <Form.Item className='input' name='afterApt' label='After Appointment'>
          <Input.TextArea style={{ borderRadius: '8px' }} />
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          style={{
            width: '100%',
            marginTop: '4%',
            justifyContent: 'end',
            display: 'flex',
            marginBottom: '1%',
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            style={{
              backgroundColor: '#eb5834',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default EditForm
