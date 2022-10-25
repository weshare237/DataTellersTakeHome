import React, { useEffect, useState } from 'react'
import {
  Table,
  Space,
  Pagination,
  Button,
  message,
  Popconfirm,
  Tag,
} from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import {
  getAllAppointments,
  deleteAppointment,
} from '../features/appointments/appointmentsSlice'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import Statistics from '../components/Statistics'
import SearchBar from '../components/SearchBar'

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { appointmentsList, total } = useSelector(
    (state: RootState) => state.appointments
  )

  const [page, setPage] = useState<number>(1)

  const text = 'Are you sure to delete this appointment?'

  const confirm = async (key: React.Key) => {
    try {
      dispatch(deleteAppointment(key))
    } catch (error) {
      console.log(error)
    }
    message.success('Appointment successfully deleted.')
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Code',
      dataIndex: 'uniqueCode',
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
      filters: [
        {
          text: 'missed',
          value: 'missed',
        },
        {
          text: 'rescheduled',
          value: 'rescheduled',
        },
        {
          text: 'passed',
          value: 'passed',
        },
        {
          text: 'pending',
          value: 'pending',
        },
      ],
      onFilter: (value: any, record) => record.status.indexOf(value) === 0,
      render: (_, record) => {
        let color = record.status === 'rescheduled' ? 'orange' : 'green'
        if (record.status === 'missed') {
          color = 'red'
        }
        return (
          <Tag
            style={{ borderRadius: '5px' }}
            color={color}
            key={record.status}
          >
            {record.status}
          </Tag>
        )
      },
    },
    {
      title: 'Apointment Date',
      dataIndex: 'aptDate',
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Link to={`/edit-appointment/${record.key}`}>
            <EditOutlined style={{ color: '#4CAF50' }} />
          </Link>
          <a href='/#'>
            <Popconfirm
              placement='left'
              title={text}
              onConfirm={() => confirm(record.key)}
              okText='Yes'
              cancelText='No'
            >
              <DeleteOutlined style={{ color: 'red' }} />
            </Popconfirm>
          </a>
        </Space>
      ),
    },
  ]

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  useEffect(() => {
    dispatch(getAllAppointments(page))
  }, [dispatch, page])

  return (
    <Space
      direction='vertical'
      size='large'
      style={{ display: 'flex', marginTop: '2%' }}
    >
      <div style={{ width: '90%', margin: 'auto' }}>
        <SearchBar />
        <Statistics />
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={appointmentsList}
        onChange={onChange}
        style={{ overflow: 'auto', width: '100%' }}
      />
      <Space
        direction='horizontal'
        size='middle'
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '3%',
        }}
      >
        <Pagination
          defaultCurrent={1}
          total={total}
          pageSize={5}
          onChange={(page, pageSize) => setPage(page)}
        />

        <Link to='/create-appointment'>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size={'middle'}
            style={{
              backgroundColor: '#eb5834',
              border: 'none',
              borderRadius: '5px',
            }}
          />
        </Link>
      </Space>
    </Space>
  )
}

export default Home
