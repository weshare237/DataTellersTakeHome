import React from 'react'
import { Input, Space, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { searchAppointment } from '../features/appointments/appointmentsSlice'
import { AppDispatch } from '../store'

const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { Search } = Input

  const { Title } = Typography

  return (
    <Space
      direction='horizontal'
      size='middle'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <Title
        level={3}
        style={{
          color: '#eb5834',
          fontWeight: 'bold',
          borderBottom: '2px solid #eb5834',
        }}
      >
        Appointments
      </Title>
      <Search
        allowClear
        placeholder='Search'
        onSearch={(search) => dispatch(searchAppointment(search))}
        style={{ width: 200 }}
      />
    </Space>
  )
}

export default SearchBar
