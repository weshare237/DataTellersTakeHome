import React from 'react'
import { Col, Row, Statistic, Card } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Statistics: React.FC = () => {
  const { totalMissed, totalPassed, totalRescheduled } = useSelector(
    (state: RootState) => state.appointments
  )

  return (
    <div className='site-statistic-demo-card'>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            style={{
              backgroundColor: '#f7c5be',
              border: 'none',
              borderTopRightRadius: '18px',
              borderBottomLeftRadius: '18px',
            }}
          >
            <Statistic
              title='Missed'
              value={totalMissed}
              valueStyle={{
                color: 'red',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              backgroundColor: '#f7e2be',
              border: 'none',
              borderTopRightRadius: '18px',
              borderBottomLeftRadius: '18px',
            }}
          >
            <Statistic
              title='Rescheduled'
              value={totalRescheduled}
              valueStyle={{
                color: 'orange',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              backgroundColor: '#c4f2cd',
              border: 'none',
              borderTopRightRadius: '18px',
              borderBottomLeftRadius: '18px',
            }}
          >
            <Statistic
              title='Passed'
              value={totalPassed}
              valueStyle={{
                color: 'green',
                fontSize: 30,
                fontWeight: 'bold',
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Statistics
