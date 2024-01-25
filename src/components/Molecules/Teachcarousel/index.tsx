import styled from 'styled-components'
import { Carousel } from 'antd'
// import "antd/dist/antd.css";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player'
import { useState } from 'react'

const Container = styled.div`
  position: relative;
  min-height: 252px !important;
  margin-top: 20px;
  border-radius: 12px;
  background-color: #5ab2a6;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  @media (max-width: 930px) {
    flex-direction: row-reverse;
  }
`

const Blob = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0, 0) scale(1);
  z-index: 0;
`

const Content = styled.span`
  position: relative;
  z-index: 1;
  color: white;
  text-align: left;
  /* border: 1px red solid; */
  padding-left: 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0.5rem 0;
    font-size: 2rem;
  }

  p {
    margin: 0.5rem 0;
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
  }
`

const LeftContainer = styled.div`
  /* min-height: 252px; */
  width: 30%;
  justify-self: flex-start;
`
const RightContainer = styled.div`
  /* min-height: 252px; */
  min-height: 100px;
  /* max-height: 252px; */
  width: 65%;
  justify-self: flex-end;
  position: relative;
  z-index: 999;
  /* display: flex; */
  flex-direction: row;
  h3 {
    margin: 0 !important;
  }
  .ant-carousel .slick-prev,
  .ant-carousel .slick-next,
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover {
    font-size: inherit;
    color: currentColor;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-prev:hover {
    left: 10px;
    z-index: 2;
    color: white;
  }

  .ant-carousel .slick-next,
  .ant-carousel .slick-next:hover {
    right: 10px;
    z-index: 2;
    color: white;
  }

  .slick-slide {
    /* width: fit-content !important; */
    display: flex !important;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    div {
      width: fit-content;
    }
  }
`

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  /* border: 2px green solid; */
  justify-content: center;
  align-items: center;
`

interface TeachCarouselProps {
  title: string
  urls: string[]
}

const TeachCarousel: React.FC<TeachCarouselProps> = ({ title, urls }) => {
  urls = [
    'https://www.youtube.com/watch?v=cLRztK1zE6s',
    'https://www.youtube.com/watch?v=LSRNmhLS76o',
    'https://www.youtube.com/watch?v=3WCIyNOrzwM&t=588s',
    'https://www.youtube.com/watch?v=e0CaefOcyAY'
  ]
  return (
    <Container>
      <LeftContainer>
        <Blob
          width='305'
          height='245'
          viewBox='0 0 305 245'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M149.683 20.8365C174.224 23.9443 197.149 1.857 221.189 7.6794C248.755 14.3559 275.597 30.357 289.899 54.7964C304.633 79.9746 298.77 110.889 298.645 140.043C298.501 173.935 318.125 221.567 289.114 239.205C255.879 259.412 215.867 220.856 177.628 213.62C159.411 210.173 141.906 206.229 123.436 207.853C89.1869 210.866 54.3021 243.759 24.2409 227.113C-2.64086 212.227 -0.942706 170.629 0.925197 140.014C2.60473 112.487 23.2898 91.4001 34.0705 66.0052C45.2553 39.6584 38.769 -1.60551 65.475 -12.0392C94.1219 -23.2313 119.163 16.9716 149.683 20.8365Z'
            fill='#FEC63D'
          />
        </Blob>

        <Content>
          <h1>Your Videos</h1>
          <p>
            Lorem ipsum dolor sit amet,
            <br /> consectetur.
          </p>
          <button>Add</button>
        </Content>
        <svg
          width='23'
          height='17'
          viewBox='0 0 23 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ position: 'absolute', top: '234px', left: '290px' }}
        >
          <circle cx='11.5' cy='11.5' r='11.5' fill='#FEC63D' />
        </svg>
        <svg
          width='33'
          height='33'
          viewBox='0 0 33 33'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ position: 'absolute', top: '212px', left: '320px' }}
        >
          <circle cx='16.5' cy='16.5' r='16.5' fill='#FEC63D' />
        </svg>
        <svg
          width='23'
          height='19'
          viewBox='0 0 23 19'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ position: 'absolute', top: '0px', left: '350px' }}
        >
          <circle cx='11.5' cy='7.5' r='11.5' fill='#FEC63D' />
        </svg>
      </LeftContainer>
      <RightContainer>
        <Carousel arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />} dots={false}>
          {urls.map((url, idx) => (
            <PlayerContainer key={idx}>
              <ReactPlayer
                url={url}
                controls={true}
                height={202}
                width={360}
              />
            </PlayerContainer>
          ))}
        </Carousel>
      </RightContainer>
    </Container>
  )
}

export default TeachCarousel
