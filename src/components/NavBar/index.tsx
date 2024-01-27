import React, { useState } from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'
import styled from 'styled-components'
import {
  faHouse,
  faPersonChalkboard,
  faClipboardList,
  faVideo,
  faUserGroup,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  @media (min-width: 801px) {
    display: none !important;
    /* position: absolute;  */
  }
`
const StyledMenu = styled(Menu)`
  padding-top: 5px;
  border-top: 1px rgba(114, 113, 113, 0.35) solid;
  &.ant-menu-horizontal {
    border-bottom: none;
    display: flex;
    justify-content: space-around;
  }

  .ant-menu-item-icon {
    width: 32px !important;
    height: 32px !important;
  }
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 10px;
    z-index: -1;
  }

  .ant-menu-item {
    color: #909395;
    width: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    border-bottom: 0px solid transparent;
    max-height: 70px !important;

    .anticon {
      margin-bottom: 0px !important;
    }

    span {
      display: flex;
      justify-content: center;
      max-height: 20px;
      align-items: center;
      font-size: 10px;
      font-weight: 700;
      margin: 0 !important;
    }
  }

  .ant-menu-item-selected {
    color: #4b65f6;
    border-bottom: 0 !important;

    &::after {
      display: none; // Hide the default Ant Design selection indicator
    }
  }
`
const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Container>
      <StyledMenu
        theme='light'
        mode='horizontal'
        defaultSelectedKeys={['3']}
        items={[
          {
            key: '1',
            icon: <FontAwesomeIcon size={'xs'} icon={faHouse} />,
            label: 'Dashboard'
          },
          {
            key: '2',
            icon: <FontAwesomeIcon size={'xs'} icon={faPersonChalkboard} />,
            label: 'Teach'
          },
          {
            key: '3',
            icon: <FontAwesomeIcon size={'xs'} icon={faClipboardList} />,
            label: 'Test'
          },
          {
            key: '4',
            icon: <FontAwesomeIcon size={'xs'} icon={faVideo} />,
            label: 'Take class'
          },
          {
            key: '5',
            icon: <FontAwesomeIcon size={'xs'} icon={faUserGroup} />,
            label: 'Video Library'
          }
        ]}
        style={{ width: '100%' }}
      />
    </Container>
  )
}

export default App
