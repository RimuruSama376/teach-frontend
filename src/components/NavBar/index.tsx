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

const items: MenuItem[] = [
  getItem('Option 5', '5'),
  getItem('Option 6', '6'),
  getItem('Option 7', '7'),
  getItem('Option 8', '8')
]

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* height: 70px; */
  /* justify-self: flex-end; */
  width: 100%;

  @media (min-width: 801px) {
    display: none !important;
    /* position: absolute;  */
  }
`
const StyledMenu = styled(Menu)`
  padding-top: 5px;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.2), 0 -2px 4px -1px rgba(0, 0, 0, 0.6);
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
    box-shadow: 0px -5px 5px -5px rgba(0, 0, 0, 0.2);
    z-index: -1;
  }

  .ant-menu-item {
    color: #909395;
    width: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    border-bottom: 2px solid transparent;

    .anticon {
      margin-bottom: 4px;
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
    color: #4B65F6;
    border-bottom: 0;

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
