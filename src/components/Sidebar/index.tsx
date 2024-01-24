import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CloseOutlined,
  DoubleRightOutlined,
  HomeOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faCommentDots, faHouse, faPersonChalkboard, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons'

const { Header, Sider } = Layout

const InnerLayout = styled(Layout)`
  height: 100vh;
  background-color: white !important;
  display: flex;
  flex-direction: column;
  li {
    color: gray;
    background-color: white !important;
    .ant-menu-title-content {
      text-align: left;
    }
  }
`

const StyledSider = styled(Sider)`
  background-color: white !important;
  /* border-right: 1px red solid; */
  box-shadow: 2px 0px 8px rgba(0, 0, 0, 0.3);
`

const SiderHeader = styled(Header)`
  padding: 10px;
  background-color: white !important;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SiderFooter = styled(Header)`
  padding: 10px;
  background-color: white !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 2px #e6e6e6 solid;
  margin-left: 7px;
  margin-right: 7px;
`

const StyledButton = styled.button`
  padding-top: 14px;
  padding-left: 21px;
  padding-bottom: 9px;
  background-color: transparent;
  width: fit-content;
  border: 0px;
  span {
    margin-left: 8px;
  }
`

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
      <StyledSider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={270}>
        <InnerLayout style={{ display: 'flex' }}>
          <SiderHeader>
            <div
              style={{
                height: '50px',
                width: '50px',
                background: '#4b65f6',
                color: 'white',
                borderRadius: '99px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
            >
              PM
            </div>
            <p style={{ marginLeft: '10px', fontSize: '16px' }}>
              {!collapsed ? 'Priyansh Mandloi' : ''}
            </p>
          </SiderHeader>
          <StyledButton onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? <CloseOutlined /> : <DoubleRightOutlined />}
            <span>{!collapsed ? 'Collapse' : ''}</span>
          </StyledButton>
          <Menu
            theme='light'
            mode='inline'
            defaultSelectedKeys={['2']}
            items={[
              {
                key: '1',
                icon: <FontAwesomeIcon icon={faHouse} />,
                label: 'Dashboard'
              },
              {
                key: '2',
                icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
                label: 'Teach'
              },
              {
                key: '3',
                icon: <FontAwesomeIcon icon={faClipboardList} />,
                label: 'Test'
              },
              {
                key: '4',
                icon: <FontAwesomeIcon icon={faVideo} />,
                label: 'Take class'
              },
              {
                key: '5',
                icon: <FontAwesomeIcon icon={faUserGroup} />,
                label: 'Video Library'
              },
              {
                key: '6',
                icon: <FontAwesomeIcon icon={faCommentDots} />,
                label: 'Doubts'
              }
            ]}
            style={{ flex: 2 }}
          />
          <SiderFooter>
            <div
              style={{
                height: '50px',
                width: '50px',
                background: '#4b65f6',
                color: 'white',
                borderRadius: '99px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
            >
              PM
            </div>
            <p style={{ marginLeft: '10px', fontSize: '16px' }}>
              {!collapsed ? 'Priyansh Mandloi' : ''}
            </p>
          </SiderFooter>
        </InnerLayout>
      </StyledSider>
  )
}

export default Sidebar
