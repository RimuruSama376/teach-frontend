import { Tabs, Select } from 'antd'
import { SearchOutlined, DownloadOutlined, ShareAltOutlined, LeftOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import withSidebarLayout from '../../components/HOCs/WithSidebar'
import TeachSection from '../../components/Organisms/TeachSection'
import { useEffect, useState } from 'react'
import axios from 'axios'

const { TabPane } = Tabs

// Styled components
const TabsContainer = styled.div`
  font-family: 'Nunito', sans-serif !important;
  height: 100%;
  padding: 10px;
  padding-bottom: 0;
  /* margin-bottom: 20px; */
  padding-left: 40px;
  padding-right: 40px;
  .ant-tabs {
    font-family: 'Nunito', sans-serif;
    height: 100%;
  }
  .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-tab {
    font-family: 'Nunito', sans-serif;
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
  .ant-tabs-content {
    font-family: 'Nunito', sans-serif;
    height: 100%;
    .ant-tabs-tabpane {
      height: 100%;
    }
  }
  .ant-tabs-extra-content {
    @media (max-width: 930px) {
      /* flex-direction: column; */
      display: none;
    }
  }
`

const StyledTabPane = styled(TabPane)`
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const StyledTopBar = styled.div`
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* display: none; */
  @media (min-width: 930px) {
    /* flex-direction: column; */
    display: none;
  }
`

export interface ITopic {
  name: string
  topicId: string
}

export interface IChapter {
  chapterId: string
  name: string
  id: string
  videos?: string[]
  topics?: ITopic[]
}

const MyTabs = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [chapters, setChapters] = useState<IChapter[]>([])
  const [activeChapter, setActiveChapter] = useState<IChapter>()

  const onChange = (value: string) => {
    setActiveChapter(chapters.find((c) => c.chapterId === value))
  }

  const onSearch = (value: string) => {
  }
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  useEffect(() => {
    const getChapters = async () => {
      try {
        const configuration = {
          method: 'get',
          url: 'http://localhost:8000/get-chapters'
        }
        const response = await axios(configuration)
        if (response.data.length) {
          setChapters(response.data)
          setActiveChapter(response.data[0])
        }
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setHasError(true)
      }
    }
    getChapters()
  }, [])

  const getDropDownChapters = (chapters: IChapter[]): { value: string; label: string }[] => {
    return chapters.map((c) => {
      return { value: c.chapterId, label: c.name }
    })
  }

  const handleAddContent = async (videoLink: string) => {
    try {
      const configuration = {
        method: 'patch',
        url: `http://localhost:8000/add-video-content/?id=${activeChapter?.chapterId}`,
        data: {
          videoLink
        }
      }
      const response = await axios(configuration)
      if (response.data) {
        setActiveChapter(response.data)
        setChapters((state) => {
          const prevState = state
          const idx = prevState.findIndex((c) => c.chapterId === activeChapter?.chapterId)
          if (idx !== -1) prevState[idx] = response.data
          return prevState
        })
      }
    } catch (err) {
      setHasError(true)
    }
    return true
  }

  return (
    <>
      <TabsContainer>
        <StyledTopBar>
          <div>
            <>
              <LeftOutlined style={{ fontSize: '16px', cursor: 'pointer' }} />
              <Select
                showSearch
                placeholder='Chapeter Name'
                optionFilterProp='children'
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={getDropDownChapters(chapters)}
                value={activeChapter?.chapterId}
                disabled={isLoading}
                style={{ marginLeft: '5px', marginBottom: '5px' }}
              />
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
                <Select
                  showSearch
                  placeholder='Chapter Name'
                  optionFilterProp='children'
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={getDropDownChapters(chapters)}
                  value={activeChapter?.chapterId}
                  disabled={isLoading}
                  style={{ marginLeft: '5px', marginBottom: '5px' }}
                />
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
            <TeachSection activeChapter={activeChapter} handleAddContent={handleAddContent} />
          </StyledTabPane>
          <StyledTabPane tab='Worksheet' key='2'>
          </StyledTabPane>
          <StyledTabPane tab='Mind-Map' key='3'>
          </StyledTabPane>
        </Tabs>
      </TabsContainer>
    </>
  )
}

export default withSidebarLayout(MyTabs)
