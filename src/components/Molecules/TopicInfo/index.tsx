import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { Button, Modal, Select, Skeleton } from 'antd'
import TeachInteractCarousel from '../../Atoms/TeachInteractCarousel'
import { IChapter, ITopic } from '../../../screens/Teach'
import axios from 'axios'

const Container = styled.div`
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
  margin-right: 2px;
  overflow-x: hidden;
`
const Topbar = styled.div`
  font-family: 'Nunito', sans-serif;
  width: 100%;
  height: fit-content;
  align-items: center;
  padding: 10px;
  display: flex;
  flex-direction: row;
  font-family: Nunito;
  justify-content: flex-start;

  button {
    cursor: pointer;
    &:last-child {
      margin-left: auto;
    }
  }

  .ant-select {
    /* background-color: black !important; */
    font-family: 'Nunito', sans-serif;
    min-width: 120px;
    max-width: 250px;
    text-align: left;
    .ant-select-selector {
      border: 0 !important;
    }
    .ant-select-selection-item {
      font-size: 18px;
    }
    .ant-select-arrow {
      svg {
        fill: black;
      }
    }
  }
`

const StyledButton = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  border: 0;
`

const StyledTextArea = styled.textarea`
  /* width: 100%; */
  font-family: 'Nunito', sans-serif;
  flex: 2;
  margin: 11px;
  margin-bottom: 1px;
  overflow-y: auto; // Allow vertical scrolling
  border: 0px solid #ccc; // A subtle border
  padding: 10px;
  resize: none; // Prevent resizing

  &:disabled {
    background: white; // Keeps background white when disabled
    color: black; // Ensures text color remains black
    border-color: #ccc; // Keeps the border color consistent
  }
`
const CardSkeleton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`

const StyledModal = styled(Modal)`
  .ant-modal-header .ant-modal-title {
    font-size: 20px;
  }
  .ant-select {
    /* background-color: black !important; */
    /* min-width: 120px;
    max-width: 250px; */
    width: 100%;
    text-align: left;

    .ant-select-selection-item {
      font-size: 18px;
    }
    .ant-select-arrow {
      svg {
        fill: black;
      }
    }
  }
  .ant-modal-footer {
    button {
      border-radius: 24px;
      text-align: center;
      height: 41px;
      span {
        font-size: 14px;
        text-align: center;
      }
    }
  }
`

const ModalInputContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 200px;
  justify-content: space-between;
`

const ModalInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px #808080 solid;
  border-radius: 4px;
  width: 47%;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #eff1fe;
    border-color: #7c90ff;
  }
  button {
    background-color: white;
    border: 1px #808080 solid;
    height: 42px;
    width: 42px;
    cursor: pointer;
  }
  p {
    font-size: 12px;
    text-align: center;
  }
`

interface TopicInfoProps {
  activeChapter: IChapter | undefined
}

interface ICurrentTopic extends ITopic {
  description: string
  PDFs: {
    name: string
    filename: string
  }[]
}

const TopicInfo: React.FC<TopicInfoProps> = ({ activeChapter }) => {
  const [topics, setTopics] = useState<ITopic[]>([])
  const [activeTopic, setActiveTopic] = useState<ITopic>()
  const [currentTopic, setCurrentTopic] = useState<ICurrentTopic>()
  const [isEditable, setIsEditable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTopics([])
    setActiveTopic(undefined)
    setTextAreaValue('')
    setCurrentTopic(undefined)
    if (activeChapter?.topics?.length) {
      setIsLoading(true)
      setTopics(activeChapter.topics)
      setActiveTopic(activeChapter.topics[0])
    }
  }, [activeChapter])

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value)
  }
  const onChange = (value: string) => {
    setActiveTopic(topics.find((c) => c.topicId === value))
  }

  const onSearch = (value: string) => {}

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const getDropDownTopics = (topics: ITopic[]): { value: string; label: string }[] => {
    return topics.map((c) => {
      return { value: c.topicId, label: c.name }
    })
  }

  useEffect(() => {
    const getTopicDetails = async () => {
      try {
        setIsLoading(true)
        const configuration = {
          method: 'get',
          url: `https://teach-backend.onrender.com/get-topic/?id=${activeTopic?.topicId}`
        }
        const response = await axios(configuration)
        setCurrentTopic(response.data)
        setTextAreaValue(response.data.description)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log('something went wrong: ', error)
      }
    }
    if (activeTopic?.topicId) {
      getTopicDetails()
    }
  }, [activeTopic])

  useEffect(() => {
    if (isEditable && textAreaRef.current) {
      const textArea = textAreaRef.current
      textArea.focus()

      const length = textArea.value.length
      textArea.setSelectionRange(length, length)
    }
  }, [isEditable])

  const toggleIsEditable = async () => {
    if (isEditable && currentTopic?.description !== textAreaValue) {
      try {
        const configuration = {
          method: 'patch',
          url: `https://teach-backend.onrender.com/update-topic-description/?id=${currentTopic?.topicId}`,
          data: {
            description: textAreaValue
          }
        }
        const response = await axios(configuration)
        setCurrentTopic(response.data)
        setTextAreaValue(response.data.description)
      } catch (error) {
        console.log('something went wrong: ', error)
      }
    }
    setIsEditable((state) => !state)
  }

  const handleButtonClick = () => {
    fileInputRef?.current?.click()
  }

  const handleFileUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('name', file.name)
    formData.append('file', file)
    console.log(formData)
    try {
      const configuration = {
        method: 'post',
        url: `https://teach-backend.onrender.com/add-pdf/?id=${activeTopic?.topicId}`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const response = await axios(configuration)
      setCurrentTopic(response.data.updatedTopic)
    } catch (err) {
      console.log(err)
    }
    setIsModalOpen(false)
  }

  return (
    <Container className='pdf-carousel-container'>
      {/* topbar */}
      <Topbar>
        <Select
          showSearch
          placeholder='Topic Name'
          optionFilterProp='children'
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={getDropDownTopics(topics)}
          value={activeTopic?.topicId}
          disabled={!activeChapter || isLoading}
        />
        <StyledButton onClick={toggleIsEditable} disabled={isLoading}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.5 4.20996H9.83333C5.66667 4.20996 4 5.87663 4 10.0433V15.0433C4 19.21 5.66667 20.8766 9.83333 20.8766H14.8333C19 20.8766 20.6667 19.21 20.6667 15.0433V13.3766'
              stroke={isEditable ? '#5AB2A6' : '#808080'}
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M15.6996 5.05936L9.13291 11.626C8.88291 11.876 8.63291 12.3677 8.58291 12.726L8.22457 15.2344C8.09124 16.1427 8.73291 16.776 9.64124 16.651L12.1496 16.2927C12.4996 16.2427 12.9912 15.9927 13.2496 15.7427L19.8162 9.17602C20.9496 8.04269 21.4829 6.72602 19.8162 5.05936C18.1496 3.39269 16.8329 3.92602 15.6996 5.05936Z'
              stroke={isEditable ? '#5AB2A6' : '#808080'}
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M14.7578 6.00098C15.3161 7.99264 16.8745 9.55098 18.8745 10.1176'
              stroke={isEditable ? '#5AB2A6' : '#808080'}
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </StyledButton>
        <StyledButton disabled={isLoading}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z'
              fill='#808080'
            />
          </svg>
        </StyledButton>
        <StyledButton onClick={() => setIsModalOpen(true)} disabled={isLoading}>
          <svg
            width='144'
            height='36'
            viewBox='0 0 144 36'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect x='0.5' y='0.5' width='143' height='35' rx='17.5' fill='white' />
            <rect x='0.5' y='0.5' width='143' height='35' rx='17.5' stroke='#808080' />
            <path
              d='M28 18C28 18.2789 27.8892 18.5463 27.692 18.7435C27.4948 18.9407 27.2274 19.0515 26.9485 19.0515L22.0515 19.0515L22.0515 23.9485C22.0515 24.2274 21.9407 24.4948 21.7435 24.692C21.5463 24.8892 21.2789 25 21 25C20.7211 25 20.4537 24.8892 20.2565 24.692C20.0593 24.4948 19.9485 24.2274 19.9485 23.9485L19.9485 19.0515L15.0515 19.0515C14.7726 19.0515 14.5052 18.9407 14.308 18.7435C14.1108 18.5463 14 18.2789 14 18C14 17.7211 14.1108 17.4537 14.308 17.2565C14.5052 17.0593 14.7726 16.9485 15.0515 16.9485L19.9485 16.9485L19.9485 12.0515C19.9485 11.7726 20.0593 11.5052 20.2565 11.308C20.4537 11.1108 20.7211 11 21 11C21.2789 11 21.5463 11.1108 21.7435 11.308C21.9407 11.5052 22.0515 11.7726 22.0515 12.0515L22.0515 16.9485L26.9485 16.9485C27.2274 16.9485 27.4948 17.0593 27.692 17.2565C27.8892 17.4537 28 17.7211 28 18Z'
              fill='black'
            />
            <path
              d='M39.152 23.112C38.9813 23.112 38.8427 23.0747 38.736 23C38.64 22.9147 38.5813 22.808 38.56 22.68C38.5493 22.5413 38.5813 22.3867 38.656 22.216L43.056 12.2C43.152 11.9867 43.264 11.8373 43.392 11.752C43.5307 11.656 43.68 11.608 43.84 11.608C44 11.608 44.144 11.656 44.272 11.752C44.4107 11.8373 44.5227 11.9867 44.608 12.2L49.024 22.216C49.1093 22.3867 49.1413 22.5413 49.12 22.68C49.1093 22.8187 49.056 22.9253 48.96 23C48.864 23.0747 48.7307 23.112 48.56 23.112C48.368 23.112 48.2133 23.064 48.096 22.968C47.9787 22.8613 47.8827 22.712 47.808 22.52L46.624 19.784L47.264 20.12H40.384L41.04 19.784L39.872 22.52C39.776 22.7227 39.6747 22.872 39.568 22.968C39.4613 23.064 39.3227 23.112 39.152 23.112ZM43.824 13.256L41.248 19.32L40.864 19.016H46.784L46.432 19.32L43.856 13.256H43.824ZM53.7541 23.144C53.0608 23.144 52.4528 22.9787 51.9301 22.648C51.4181 22.3173 51.0181 21.8533 50.7301 21.256C50.4528 20.648 50.3141 19.9333 50.3141 19.112C50.3141 18.28 50.4528 17.5653 50.7301 16.968C51.0181 16.36 51.4181 15.896 51.9301 15.576C52.4528 15.2453 53.0608 15.08 53.7541 15.08C54.4581 15.08 55.0608 15.256 55.5621 15.608C56.0635 15.96 56.3995 16.4347 56.5701 17.032H56.3941V12.264C56.3941 12.0507 56.4475 11.8907 56.5541 11.784C56.6715 11.6667 56.8368 11.608 57.0501 11.608C57.2528 11.608 57.4075 11.6667 57.5141 11.784C57.6315 11.8907 57.6901 12.0507 57.6901 12.264V22.44C57.6901 22.6533 57.6368 22.8187 57.5301 22.936C57.4235 23.0533 57.2635 23.112 57.0501 23.112C56.8475 23.112 56.6875 23.0533 56.5701 22.936C56.4635 22.8187 56.4101 22.6533 56.4101 22.44V20.92L56.5861 21.144C56.4155 21.752 56.0741 22.2373 55.5621 22.6C55.0608 22.9627 54.4581 23.144 53.7541 23.144ZM54.0261 22.104C54.5061 22.104 54.9275 21.9867 55.2901 21.752C55.6528 21.5173 55.9301 21.176 56.1221 20.728C56.3248 20.28 56.4261 19.7413 56.4261 19.112C56.4261 18.1413 56.2075 17.4 55.7701 16.888C55.3435 16.376 54.7621 16.12 54.0261 16.12C53.5355 16.12 53.1088 16.2373 52.7461 16.472C52.3941 16.696 52.1168 17.032 51.9141 17.48C51.7221 17.9173 51.6261 18.4613 51.6261 19.112C51.6261 20.072 51.8448 20.8133 52.2821 21.336C52.7195 21.848 53.3008 22.104 54.0261 22.104ZM63.0823 23.144C62.3889 23.144 61.7809 22.9787 61.2582 22.648C60.7463 22.3173 60.3463 21.8533 60.0583 21.256C59.7809 20.648 59.6423 19.9333 59.6423 19.112C59.6423 18.28 59.7809 17.5653 60.0583 16.968C60.3463 16.36 60.7463 15.896 61.2582 15.576C61.7809 15.2453 62.3889 15.08 63.0823 15.08C63.7863 15.08 64.3889 15.256 64.8903 15.608C65.3916 15.96 65.7276 16.4347 65.8983 17.032H65.7223V12.264C65.7223 12.0507 65.7756 11.8907 65.8823 11.784C65.9996 11.6667 66.1649 11.608 66.3783 11.608C66.5809 11.608 66.7356 11.6667 66.8423 11.784C66.9596 11.8907 67.0183 12.0507 67.0183 12.264V22.44C67.0183 22.6533 66.9649 22.8187 66.8583 22.936C66.7516 23.0533 66.5916 23.112 66.3783 23.112C66.1756 23.112 66.0156 23.0533 65.8983 22.936C65.7916 22.8187 65.7383 22.6533 65.7383 22.44V20.92L65.9143 21.144C65.7436 21.752 65.4023 22.2373 64.8903 22.6C64.3889 22.9627 63.7863 23.144 63.0823 23.144ZM63.3543 22.104C63.8343 22.104 64.2556 21.9867 64.6183 21.752C64.9809 21.5173 65.2583 21.176 65.4503 20.728C65.6529 20.28 65.7543 19.7413 65.7543 19.112C65.7543 18.1413 65.5356 17.4 65.0983 16.888C64.6716 16.376 64.0903 16.12 63.3543 16.12C62.8636 16.12 62.4369 16.2373 62.0743 16.472C61.7223 16.696 61.4449 17.032 61.2423 17.48C61.0503 17.9173 60.9543 18.4613 60.9543 19.112C60.9543 20.072 61.1729 20.8133 61.6103 21.336C62.0476 21.848 62.6289 22.104 63.3543 22.104ZM78.6314 23.144C77.522 23.144 76.5727 22.9093 75.7834 22.44C74.994 21.9707 74.386 21.304 73.9594 20.44C73.5434 19.576 73.3354 18.5467 73.3354 17.352C73.3354 16.456 73.4527 15.656 73.6874 14.952C73.9327 14.2373 74.2794 13.6347 74.7274 13.144C75.186 12.6427 75.746 12.2587 76.4074 11.992C77.0687 11.7147 77.81 11.576 78.6314 11.576C79.2927 11.576 79.922 11.672 80.5194 11.864C81.1167 12.0453 81.634 12.3173 82.0714 12.68C82.21 12.7867 82.3007 12.9093 82.3434 13.048C82.3967 13.176 82.402 13.304 82.3594 13.432C82.3274 13.5493 82.2634 13.6507 82.1674 13.736C82.082 13.8107 81.9754 13.848 81.8474 13.848C81.7194 13.848 81.5754 13.7947 81.4154 13.688C81.0314 13.3787 80.61 13.1493 80.1514 13C79.6927 12.8507 79.1967 12.776 78.6634 12.776C77.8207 12.776 77.106 12.9573 76.5194 13.32C75.9327 13.672 75.49 14.1893 75.1914 14.872C74.8927 15.5547 74.7434 16.3813 74.7434 17.352C74.7434 18.3227 74.8927 19.1547 75.1914 19.848C75.49 20.5307 75.9327 21.0533 76.5194 21.416C77.106 21.768 77.8207 21.944 78.6634 21.944C79.186 21.944 79.682 21.8693 80.1514 21.72C80.6207 21.56 81.0527 21.3253 81.4474 21.016C81.6074 20.9093 81.7514 20.8613 81.8794 20.872C82.0074 20.872 82.114 20.9093 82.1994 20.984C82.2847 21.0587 82.3434 21.1547 82.3754 21.272C82.418 21.3893 82.418 21.512 82.3754 21.64C82.3434 21.768 82.2634 21.88 82.1354 21.976C81.6874 22.36 81.1594 22.6533 80.5514 22.856C79.954 23.048 79.314 23.144 78.6314 23.144ZM87.0105 23.144C86.2532 23.144 85.5972 22.9787 85.0425 22.648C84.4878 22.3173 84.0558 21.8533 83.7465 21.256C83.4478 20.648 83.2985 19.9333 83.2985 19.112C83.2985 18.4933 83.3838 17.9387 83.5545 17.448C83.7252 16.9467 83.9758 16.52 84.3065 16.168C84.6372 15.816 85.0265 15.5493 85.4745 15.368C85.9332 15.176 86.4452 15.08 87.0105 15.08C87.7678 15.08 88.4238 15.2453 88.9785 15.576C89.5332 15.9067 89.9598 16.376 90.2585 16.984C90.5678 17.5813 90.7225 18.2907 90.7225 19.112C90.7225 19.7307 90.6372 20.2853 90.4665 20.776C90.2958 21.2667 90.0452 21.6933 89.7145 22.056C89.3838 22.408 88.9892 22.68 88.5305 22.872C88.0825 23.0533 87.5758 23.144 87.0105 23.144ZM87.0105 22.104C87.4905 22.104 87.9118 21.9867 88.2745 21.752C88.6372 21.5173 88.9145 21.176 89.1065 20.728C89.3092 20.28 89.4105 19.7413 89.4105 19.112C89.4105 18.1413 89.1918 17.4 88.7545 16.888C88.3278 16.376 87.7465 16.12 87.0105 16.12C86.5198 16.12 86.0932 16.2373 85.7305 16.472C85.3785 16.696 85.1012 17.032 84.8985 17.48C84.7065 17.9173 84.6105 18.4613 84.6105 19.112C84.6105 20.072 84.8292 20.8133 85.2665 21.336C85.7038 21.848 86.2852 22.104 87.0105 22.104ZM93.3091 23.112C93.0958 23.112 92.9358 23.0533 92.8291 22.936C92.7225 22.8187 92.6691 22.6533 92.6691 22.44V15.768C92.6691 15.5547 92.7225 15.3947 92.8291 15.288C92.9358 15.1707 93.0905 15.112 93.2931 15.112C93.4958 15.112 93.6505 15.1707 93.7571 15.288C93.8745 15.3947 93.9331 15.5547 93.9331 15.768V17.144L93.7571 16.952C93.9811 16.3333 94.3438 15.8693 94.8451 15.56C95.3571 15.24 95.9438 15.08 96.6051 15.08C97.2238 15.08 97.7358 15.192 98.1411 15.416C98.5571 15.64 98.8665 15.9813 99.0691 16.44C99.2718 16.888 99.3731 17.4587 99.3731 18.152V22.44C99.3731 22.6533 99.3145 22.8187 99.1971 22.936C99.0905 23.0533 98.9358 23.112 98.7331 23.112C98.5198 23.112 98.3545 23.0533 98.2371 22.936C98.1305 22.8187 98.0771 22.6533 98.0771 22.44V18.232C98.0771 17.5067 97.9331 16.9787 97.6451 16.648C97.3678 16.3067 96.9198 16.136 96.3011 16.136C95.5865 16.136 95.0158 16.36 94.5891 16.808C94.1731 17.2453 93.9651 17.832 93.9651 18.568V22.44C93.9651 22.888 93.7465 23.112 93.3091 23.112ZM104.883 23.144C104.275 23.144 103.763 23.0373 103.347 22.824C102.942 22.6 102.638 22.28 102.435 21.864C102.232 21.4373 102.131 20.92 102.131 20.312V16.232H101.059C100.878 16.232 100.739 16.1893 100.643 16.104C100.547 16.008 100.499 15.88 100.499 15.72C100.499 15.56 100.547 15.4373 100.643 15.352C100.739 15.2667 100.878 15.224 101.059 15.224H102.131V13.384C102.131 13.1707 102.19 13.0107 102.307 12.904C102.424 12.7867 102.584 12.728 102.787 12.728C102.99 12.728 103.144 12.7867 103.251 12.904C103.368 13.0107 103.427 13.1707 103.427 13.384V15.224H105.443C105.624 15.224 105.763 15.2667 105.859 15.352C105.955 15.4373 106.003 15.56 106.003 15.72C106.003 15.88 105.955 16.008 105.859 16.104C105.763 16.1893 105.624 16.232 105.443 16.232H103.427V20.184C103.427 20.792 103.555 21.256 103.811 21.576C104.067 21.8853 104.483 22.04 105.059 22.04C105.262 22.04 105.432 22.0187 105.571 21.976C105.72 21.9333 105.843 21.912 105.939 21.912C106.035 21.9013 106.115 21.9333 106.179 22.008C106.243 22.0827 106.275 22.2107 106.275 22.392C106.275 22.52 106.248 22.6373 106.195 22.744C106.152 22.8507 106.072 22.9253 105.955 22.968C105.827 23.0107 105.656 23.048 105.443 23.08C105.24 23.1227 105.054 23.144 104.883 23.144ZM110.783 23.144C109.961 23.144 109.252 22.984 108.655 22.664C108.068 22.3333 107.609 21.8693 107.279 21.272C106.959 20.6747 106.799 19.96 106.799 19.128C106.799 18.3173 106.959 17.6133 107.279 17.016C107.599 16.408 108.036 15.9333 108.591 15.592C109.156 15.2507 109.807 15.08 110.543 15.08C111.065 15.08 111.535 15.1707 111.951 15.352C112.367 15.5227 112.719 15.7733 113.007 16.104C113.305 16.4347 113.529 16.8347 113.679 17.304C113.839 17.7733 113.919 18.3013 113.919 18.888C113.919 19.0587 113.871 19.1867 113.775 19.272C113.679 19.3467 113.54 19.384 113.359 19.384H107.791V18.536H113.055L112.799 18.744C112.799 18.168 112.713 17.6827 112.543 17.288C112.372 16.8827 112.121 16.5733 111.791 16.36C111.471 16.1467 111.065 16.04 110.575 16.04C110.031 16.04 109.567 16.168 109.183 16.424C108.809 16.6693 108.527 17.016 108.335 17.464C108.143 17.9013 108.047 18.4133 108.047 19V19.096C108.047 20.0773 108.281 20.824 108.751 21.336C109.231 21.848 109.908 22.104 110.783 22.104C111.145 22.104 111.503 22.056 111.855 21.96C112.217 21.864 112.569 21.704 112.911 21.48C113.06 21.384 113.193 21.3413 113.311 21.352C113.439 21.352 113.54 21.3893 113.615 21.464C113.689 21.528 113.737 21.6133 113.759 21.72C113.791 21.816 113.78 21.9227 113.727 22.04C113.684 22.1573 113.593 22.2587 113.455 22.344C113.103 22.6 112.687 22.7973 112.207 22.936C111.727 23.0747 111.252 23.144 110.783 23.144ZM116.434 23.112C116.221 23.112 116.061 23.0533 115.954 22.936C115.847 22.8187 115.794 22.6533 115.794 22.44V15.768C115.794 15.5547 115.847 15.3947 115.954 15.288C116.061 15.1707 116.215 15.112 116.418 15.112C116.621 15.112 116.775 15.1707 116.882 15.288C116.999 15.3947 117.058 15.5547 117.058 15.768V17.144L116.882 16.952C117.106 16.3333 117.469 15.8693 117.97 15.56C118.482 15.24 119.069 15.08 119.73 15.08C120.349 15.08 120.861 15.192 121.266 15.416C121.682 15.64 121.991 15.9813 122.194 16.44C122.397 16.888 122.498 17.4587 122.498 18.152V22.44C122.498 22.6533 122.439 22.8187 122.322 22.936C122.215 23.0533 122.061 23.112 121.858 23.112C121.645 23.112 121.479 23.0533 121.362 22.936C121.255 22.8187 121.202 22.6533 121.202 22.44V18.232C121.202 17.5067 121.058 16.9787 120.77 16.648C120.493 16.3067 120.045 16.136 119.426 16.136C118.711 16.136 118.141 16.36 117.714 16.808C117.298 17.2453 117.09 17.832 117.09 18.568V22.44C117.09 22.888 116.871 23.112 116.434 23.112ZM128.008 23.144C127.4 23.144 126.888 23.0373 126.472 22.824C126.067 22.6 125.763 22.28 125.56 21.864C125.357 21.4373 125.256 20.92 125.256 20.312V16.232H124.184C124.003 16.232 123.864 16.1893 123.768 16.104C123.672 16.008 123.624 15.88 123.624 15.72C123.624 15.56 123.672 15.4373 123.768 15.352C123.864 15.2667 124.003 15.224 124.184 15.224H125.256V13.384C125.256 13.1707 125.315 13.0107 125.432 12.904C125.549 12.7867 125.709 12.728 125.912 12.728C126.115 12.728 126.269 12.7867 126.376 12.904C126.493 13.0107 126.552 13.1707 126.552 13.384V15.224H128.568C128.749 15.224 128.888 15.2667 128.984 15.352C129.08 15.4373 129.128 15.56 129.128 15.72C129.128 15.88 129.08 16.008 128.984 16.104C128.888 16.1893 128.749 16.232 128.568 16.232H126.552V20.184C126.552 20.792 126.68 21.256 126.936 21.576C127.192 21.8853 127.608 22.04 128.184 22.04C128.387 22.04 128.557 22.0187 128.696 21.976C128.845 21.9333 128.968 21.912 129.064 21.912C129.16 21.9013 129.24 21.9333 129.304 22.008C129.368 22.0827 129.4 22.2107 129.4 22.392C129.4 22.52 129.373 22.6373 129.32 22.744C129.277 22.8507 129.197 22.9253 129.08 22.968C128.952 23.0107 128.781 23.048 128.568 23.08C128.365 23.1227 128.179 23.144 128.008 23.144Z'
              fill='black'
            />
          </svg>
        </StyledButton>
      </Topbar>
      {isLoading ? (
        <CardSkeleton>
          <Skeleton.Button active style={{ width: '150px', height: '140px' }}></Skeleton.Button>
          <Skeleton.Button active style={{ width: '150px', height: '140px' }}></Skeleton.Button>
          <Skeleton.Button active style={{ width: '150px', height: '140px' }}></Skeleton.Button>
        </CardSkeleton>
      ) : (
        <TeachInteractCarousel PDFs={currentTopic?.PDFs ? currentTopic.PDFs : []} />
      )}
      {isLoading ? (
        <div style={{ margin: '10px' }}>
          <Skeleton
            title={false}
            active
            paragraph={{
              rows: 10,
              width: Array(10).fill('100%')
            }}
          />
        </div>
      ) : (
        <StyledTextArea
          disabled={!isEditable}
          placeholder=''
          value={textAreaValue}
          ref={textAreaRef}
          onChange={handleTextAreaChange}
          style={{ border: isEditable ? '1px blue solid' : '0' }}
        />
      )}
      <StyledModal
        title='Add Content'
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        style={{
          maxHeight: '413px',
          maxWidth: '342px'
        }}
        okButtonProps={{
          onClick: handleFileUpload,
          disabled: !file
        }}
        okText={
          <>
            <svg
              width='14'
              height='15'
              viewBox='0 -1 14 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1 7.5H13' stroke='white' stroke-width='2' stroke-linecap='round' />
              <path d='M7 13.5L7 1.5' stroke='white' stroke-width='2' stroke-linecap='round' />
            </svg>
            {'  '}Add Content
          </>
        }
        // okButtonProps={}
      >
        <p style={{ fontSize: '18px', color: '#525252', marginBottom: '10px' }}>Topic Name</p>
        <Select
          showSearch
          placeholder='Topic Name'
          optionFilterProp='children'
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={getDropDownTopics(topics)}
          value={activeTopic?.topicId}
          disabled={!activeChapter || isLoading}
        />
        <ModalInputContainer>
          <ModalInput
            onClick={() => {
              setIsModalOpen(false)
              setIsEditable(true)
            }}
          >
            <button>
              <img src='/inputtext.png' alt='' />
            </button>
            <p>Type your own personalized content</p>
          </ModalInput>
          <ModalInput>
            <button onClick={handleButtonClick}>
              <img src='/inputfile.png' alt='' />
            </button>
            <p>{file ? file?.name : 'Upload a pdf of your content'}</p>
            <form action=''>
              <input
                type='file'
                className='form-control'
                accept='application/pdf'
                required
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                  console.log(e?.target?.files?.[0])
                  setFile(e?.target?.files?.[0])
                }}
              />
            </form>
          </ModalInput>
        </ModalInputContainer>
      </StyledModal>
    </Container>
  )
}

export default TopicInfo
