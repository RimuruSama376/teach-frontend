import React from 'react'
import { Tabs } from 'antd'
import { SearchOutlined, DownloadOutlined, ShareAltOutlined, LeftOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import withSidebarLayout from '../HOCs/WithSidebar'

const { TabPane } = Tabs

// Styled components
const TabsContainer = styled.div`
  padding: 10px;
  padding-left: 10px;
  padding-right: 15px;
  .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-tab {
    font-size: 14px;
    font-weight: 600;
    padding: 5px 0px 10px 0px;
    color: #cccccc;
  }
  .ant-tabs-tab-active {
    /* padding: 5px 0px 10px 0px; */
    div {
      color: black !important;
    }
  }
  .ant-tabs-nav-wrap {
    /* padding: 12px 16px; */
    display: flex;
    justify-content: center;
  }
  .ant-tabs-tab:hover {
    color: #1890ff;
    cursor: pointer;
  }
  .ant-tabs-ink-bar {
    background-color: #4b65f6;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background: #ffffff; // Use your desired color
  color: #000; // Use your desired color
`

const ChapterName = styled.span`
  margin-right: auto;
  padding-left: 16px;
  font-size: 20px;
  font-weight: 700;
  height: 100%;
`

const MyTabs = () => {
  return (
    <>
      {/* <HeaderContainer> */}
      {/* <LeftOutlined style={{ fontSize: '16px', cursor: 'pointer' }} />
        <ChapterName>Chapter Name</ChapterName> */}
      <TabsContainer>
        <Tabs
          defaultActiveKey='1'
          tabBarExtraContent={{
            left: (
              <>
                <LeftOutlined style={{ fontSize: '16px', cursor: 'pointer' }} />
                <ChapterName>Chapter Name</ChapterName>
              </>
            ),
            right: (
              <>
                <SearchOutlined
                  style={{ padding: '0 16px', fontSize: '16px', cursor: 'pointer' }}
                />
                <DownloadOutlined
                  style={{ padding: '0 16px', fontSize: '16px', cursor: 'pointer' }}
                />
                <ShareAltOutlined
                  style={{ padding: '0 16px', fontSize: '16px', cursor: 'pointer' }}
                />
              </>
            )
          }}
        >
          <TabPane tab='Teach' key='1'>
            {/* Content for Teach tab */}
          </TabPane>
          <TabPane tab='Worksheet' key='2'>
            {/* Content for Worksheet tab */}
          </TabPane>
          <TabPane tab='Mind-Map' key='3'>
            {/* Content for Mind-Map tab */}
          </TabPane>
        </Tabs>
      </TabsContainer>
      {/* </HeaderContainer> */}
      {/* Content below the header */}
    </>
  )
}

export default withSidebarLayout(MyTabs)
