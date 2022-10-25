import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import BackToTop from './BackToTop'

const SharedLayout: React.FC = () => {
  const { Header, Content } = Layout
  return (
    <Layout className='layout' style={{ backgroundColor: '#e3dedc' }}>
      <Header
        style={{
          color: 'white',
          display: 'flex',
          padding: 0,
          margin: 8,
          backgroundColor: '#646869',
        }}
      >
        <div
          style={{
            width: '40%',
            backgroundColor: '#22b2bf',
            borderBottomRightRadius: '50%',
            fontWeight: 'bold',
            fontSize: '2vh',
            paddingLeft: 30,
          }}
        >
          DrNG | PATIENTS
        </div>
        <div style={{ width: '60%' }}></div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className='site-layout-content' style={{ minHeight: '100vh' }}>
          <Outlet />
        </div>
        <BackToTop />
      </Content>
    </Layout>
  )
}

export default SharedLayout
