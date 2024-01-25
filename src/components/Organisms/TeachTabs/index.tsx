import { Tabs } from 'antd'
import { SearchOutlined, DownloadOutlined, ShareAltOutlined, LeftOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import withSidebarLayout from '../../HOCs/WithSidebar'
import TeachSection from '../TeachSection'

const { TabPane } = Tabs

// Styled components
const TabsContainer = styled.div`
  height: 100%;
  padding: 10px;
  margin-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
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

  .ant-tabs-extra-content {
    @media (max-width: 930px) {
      /* flex-direction: column; */
      display: none;
    }
  }
`

const ChapterName = styled.span`
  margin-right: auto;
  padding-left: 16px;
  font-size: 20px;
  font-weight: 700;
  height: 100%;
`

const StyledTabPane = styled(TabPane)`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 3px green solid;
`

const StyledTopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* display: none; */
  @media (min-width: 930px) {
      /* flex-direction: column; */
      display: none;
    }
`

const MyTabs = () => {
  return (
    <>
      <TabsContainer>
        <StyledTopBar>
          <div>
            <>
              <LeftOutlined style={{ fontSize: '16px', cursor: 'pointer' }} />
              <ChapterName>Chapter Name</ChapterName>
            </>
          </div>
          <div>
            <>
              <SearchOutlined style={{ padding: '0 16px', fontSize: '16px', cursor: 'pointer' }} />
              <DownloadOutlined
                style={{ padding: '0 16px', fontSize: '16px', cursor: 'pointer' }}
              />
              <ShareAltOutlined
                style={{ padding: '0 16px', fontSize: '16px', cursor: 'pointer' }}
              />
            </>
          </div>
        </StyledTopBar>
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
          <StyledTabPane tab='Teach' key='1'>
            {/* Content for Teach tab */}
            <TeachSection />
          </StyledTabPane>
          <StyledTabPane tab='Worksheet' key='2'>
            {/* Content for Worksheet tab */}
          </StyledTabPane>
          <StyledTabPane tab='Mind-Map' key='3'>
            {/* Content for Mind-Map tab */}
          </StyledTabPane>
        </Tabs>
      </TabsContainer>
    </>
  )
}

export default withSidebarLayout(MyTabs)
