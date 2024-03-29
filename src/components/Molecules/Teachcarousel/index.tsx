import styled from 'styled-components'
import { Modal } from 'antd'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player'
import { IChapter } from '../../../screens/Teach'
import { useRef, useState } from 'react'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 252px;
  margin-top: 20px;
  border-radius: 12px;
  background-color: #5ab2a6;
  /* overflow: hidden; */
  max-width: 2000px;
  @media (max-width: 930px) {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start !important;
    height: 184px;
  }
`
interface BlobProps {
  top?: string
  left?: string
  top2?: string
  left2?: string
  top3?: string
  left3?: string
  scale?: number
}

const Blob = styled.svg<BlobProps>`
  /* display: none; */
  position: absolute;
  top: ${(props) => props.top || 'auto'};
  left: ${(props) => props.left || 'auto'};
  transform: ${(props) =>
    `translate(${props.left || 0}, ${props.top || 0}) scale(${props.scale || 1})`};
  z-index: 0;
  transition: transform 0.6s ease-in-out;
  @media (max-width: 1046px) {
    top: ${(props) => props.top || 'auto'};
    left: ${(props) => props.left || 'auto'};
    transform: ${(props) =>
      `translate(${props.left2 || 0}, ${props.top2 || 0}) scale(${props.scale || 1})`};
  }
  @media (max-width: 930px) {
    top: ${(props) => props.top || 'auto'} !important;
    left: ${(props) => props.left || 'auto'} !important;
    transform: ${(props) =>
      `translate(${props.left3 || 0}, ${props.top3 || 0}) scale(0.75)`};
    /* transform: ${(props) => `scale(0.75)`} !important; */
  }
`

const Content = styled.div`
  /* flex: 1; */
  position: relative;
  z-index: 1;
  color: white;
  text-align: left;
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  max-height: 177px;
  h1 {
    margin: 0;
    font-size: 22px;
    @media (max-width: 500px) {
      font-size: 16px;
    }
    @media (max-width: 500px) {
      font-size: 16px;
    }
  }

  p {
    margin: 0;
  }

  button {
    color: white;
    background-color: transparent;
    border: 2px white solid;
    border-radius: 9px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
    margin-top: 1rem;
    width: 109px;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #5ab2a6;
    }
    &:disabled {
      cursor: not-allowed;
      &:hover {
        background-color: transparent;
      }
    }
  }
  @media (max-width: 930px) {
    margin-left: auto;
  }
`

const RightContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  justify-self: flex-start;
  max-width: 500px;
  /* z-index: 999; */
  @media (max-width: 1320px) {
    margin-right: 100px;
  }
  @media (max-width: 1180px) {
    margin-right: 50px;
  }
  @media (max-width: 930px) {
    margin-right: 0;
    margin-left: 0;
  }
  @media (max-width: 700px) {
    max-width: 250px !important;
    margin-right: auto;
    margin-left: auto;
  }
  .carousel-root .carousel .slider-wrapper ul {
    .slide .player-container {
      div {
        width: inherit !important;
        @media (max-width: 930px) {
          height: 150px !important;
        }
      }
    }
  }
`

const PlayerContainer = styled.div`
  /* display: flex;
  flex-direction: row;
  width: fit-content;
  justify-content: center;
  align-items: center; */
`

interface TeachCarouselProps {
  activeChapter: IChapter | undefined
  handleAddContent: (s: string) => void
}

const TeachCarousel: React.FC<TeachCarouselProps> = ({ activeChapter, handleAddContent }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const linkRef = useRef<HTMLInputElement>(null)
  const [isLinkValid, setIsLinkValid] = useState(true)
  console.log(activeChapter?.videos)
  const onAddContent = async () => {
    try {
      const link = linkRef?.current?.value as string
      const configuration = {
        method: 'get',
        url: `https://www.youtube.com/oembed?format=json&url=${link}`
      }
      const response = await axios(configuration)
      console.log(response)
      setIsLinkValid(true)
      handleAddContent(link)
      setModalOpen(false)
    } catch (err) {
      setIsLinkValid(false)
    }
  }
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }
  return (
    <Container>
      <Modal
        title='Enter the youtube link'
        centered
        open={modalOpen}
        onOk={onAddContent}
        onCancel={() => setModalOpen(false)}
      >
        <input title='link' placeholder='www.youtube.com/...' ref={linkRef} />
        {!isLinkValid ? <p style={{ color: 'red' }}>Please enter a valid link</p> : ''}
      </Modal>
      <Blob
        top='15px'
        left='0px'
        top2='15px'
        left2='0px'
        top3='-16px'
        left3='-20px'
        width='305'
        height='245'
        viewBox='0 0 305 245'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M149.683 20.8365C174.224 23.9443 197.149 1.857 221.189 7.6794C248.755 14.3559 275.597 30.357 289.899 54.7964C304.633 79.9746 298.77 110.889 298.645 140.043C298.501 173.935 318.125 221.567 289.114 239.205C255.879 259.412 215.867 220.856 177.628 213.62C159.411 210.173 141.906 206.229 123.436 207.853C89.1869 210.866 54.3021 243.759 24.2409 227.113C-2.64086 212.227 -0.942706 170.629 0.925197 140.014C2.60473 112.487 23.2898 91.4001 34.0705 66.0052C45.2553 39.6584 38.769 -1.60551 65.475 -12.0392C94.1219 -23.2313 119.163 16.9716 149.683 20.8365Z'
          fill='#FEC63D'
        />
      </Blob>
      <Blob
        top='133px'
        left='143px'
        top2='133px'
        left2='-60px'
        top3='67px'
        left3='-60px'
        width='23'
        height='16'
        viewBox='0 0 23 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='11.5' cy='11.5' r='12' fill='#FEC63D' />
      </Blob>
      <Blob
        top='120px'
        left='160px'
        top2='120px'
        left2='-50px'
        top3='63px'
        left3='-58px'
        width='33'
        height='32'
        viewBox='0 0 33 33'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='16.5' cy='16.5' r='16.5' fill='#FEC63D' />
      </Blob>
      <Blob
        top='60px'
        left='120px'
        top2='20px'
        left2='-120px'
        top3='-10px'
        left3='-105px'
        width='33'
        height='32'
        viewBox='0 0 33 33'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='16.5' cy='16.5' r='14.5' fill='#FEC63D' />
      </Blob>
      <Blob
        top='15px'
        left='200px'
        top2='15px'
        left2='-50px'
        top3='12px'
        left3='-80px'
        width='23'
        height='19'
        viewBox='0 0 23 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='11.5' cy='7.5' r='11.5' fill='#FEC63D' />
      </Blob>
      <Content>
        <h1>Your Videos</h1>
        <p>
          Lorem ipsum dolor sit amet,
          <br /> consectetur.
        </p>
        <button
          disabled={activeChapter?.chapterId === undefined}
          onClick={() => setModalOpen(true)}
        >
          Add
        </button>
      </Content>
      <RightContainer>
        {activeChapter?.videos?.length ? (
          <Carousel showArrows={true} showThumbs={false} showIndicators={false} showStatus={false}>
            {activeChapter?.videos?.map((url, idx) => (
              <PlayerContainer key={idx} className='player-container'>
                <ReactPlayer url={url} controls={true} height={240} width={420} />
              </PlayerContainer>
            ))}
          </Carousel>
        ) : null}
      </RightContainer>
    </Container>
  )
}

export default TeachCarousel
