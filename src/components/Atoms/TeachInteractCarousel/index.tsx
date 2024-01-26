import styled from 'styled-components'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const Container = styled.div`
  margin-left: 10px;
  overflow-x: hidden;
  /* max-width: 500px; */
  width: 100%;
  display: block;
  justify-self: center;
  align-self: center;
  .ant-carousel .slick-prev,
  .ant-carousel .slick-next,
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover {
    font-size: inherit;
    color: currentColor;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-prev:hover {
    padding-top: 3px;
    left: 10;
    z-index: 2;
    width: 20px;
    background-color: white;
    color: #4d4d4d;
    border-radius: 50%; /* Makes it circular */
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }

  .ant-carousel .slick-next,
  .ant-carousel .slick-next:hover {
    padding-top: 3px;
    right: 0px;
    z-index: 2;
    width: 20px;
    background-color: white;
    color: #4d4d4d;
    border-radius: 50%; /* Makes it circular */
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
`

const StyledCard = styled.div`
  margin-left: 5px;
  margin-top: 15px;
  margin-right: 15px;
  height: 130px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  border-radius: 8px;
`

const Top = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: #d9d9d9;
  width: 120px;
  /* height: 100px; */
  border-radius: 8px;
  img {
    border: 3px black solid;
    border-bottom: 0;
  }
  `
const Bottom = styled.div`
  margin-top: 7px;
  width: 120px;
  flex: 1;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    padding: 0;
    margin: 0;
    color: #808080;
    font-family: 'Nunito';
    font-size: 12px;
    width: 75px;
    display: -webkit-box;
    max-width: 200px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
  }

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`

interface TeachCarouselProps {
  PDFs: {
    name: string
    filename: string
  }[]
}

const TeachInteractCarousel: React.FC<TeachCarouselProps> = ({ PDFs }) => {
  const [slidesToShow, setSlidesToShow] = useState(3)

  const onChange = (currentSlide: number) => {
  }

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document?.querySelector('.pdf-carousel-container')?.clientWidth || 1
      const slideWidth = 130
      const newSlidesToShow = Math.max(1, Math.floor(containerWidth / slideWidth) || 4)

      setSlidesToShow(Math.min(newSlidesToShow, 3))
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const openPdf = (filename: string) =>{
    window.open(`https://teach-backend.onrender.com/files/${filename}`, "_blank", "noreferrer")
  }
  return (
    <Container className='dafdsfaf'>
      <Carousel
        afterChange={onChange}
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        slidesToShow={Math.min(slidesToShow, PDFs.length)}
        dots={false}
      >
        {PDFs.length
          ? PDFs.map((p) => {
              return (
                <div>
                  <StyledCard>
                    <Top>
                      <img src='/pdfimg.png' alt='' />
                    </Top>
                    <Bottom>
                      <svg
                        width='18'
                        height='18s'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect width='16' height='16' rx='2' fill='#FF0000' />
                        <path
                          d='M1.987 10.056C1.84233 10.056 1.73033 10.0163 1.651 9.937C1.57633 9.853 1.539 9.73867 1.539 9.594V5.52C1.539 5.37067 1.57867 5.25867 1.658 5.184C1.73733 5.10467 1.84933 5.065 1.994 5.065H3.681C4.22233 5.065 4.64 5.20033 4.934 5.471C5.228 5.74167 5.375 6.11967 5.375 6.605C5.375 7.09033 5.228 7.47067 4.934 7.746C4.64 8.01667 4.22233 8.152 3.681 8.152H2.435V9.594C2.435 9.73867 2.39767 9.853 2.323 9.937C2.24833 10.0163 2.13633 10.056 1.987 10.056ZM2.435 7.445H3.541C3.85833 7.445 4.09867 7.375 4.262 7.235C4.42533 7.09033 4.507 6.88033 4.507 6.605C4.507 6.32967 4.42533 6.122 4.262 5.982C4.09867 5.842 3.85833 5.772 3.541 5.772H2.435V7.445ZM6.58141 10C6.42741 10 6.30841 9.96033 6.22441 9.881C6.14507 9.797 6.10541 9.678 6.10541 9.524V5.541C6.10541 5.387 6.14507 5.27033 6.22441 5.191C6.30841 5.107 6.42741 5.065 6.58141 5.065H7.93941C8.76541 5.065 9.40241 5.27733 9.85041 5.702C10.3031 6.12667 10.5294 6.73567 10.5294 7.529C10.5294 7.92567 10.4711 8.278 10.3544 8.586C10.2424 8.88933 10.0744 9.146 9.85041 9.356C9.63107 9.566 9.36041 9.727 9.03841 9.839C8.72107 9.94633 8.35474 10 7.93941 10H6.58141ZM7.00141 9.258H7.88341C8.17274 9.258 8.42241 9.223 8.63241 9.153C8.84707 9.07833 9.02441 8.971 9.16441 8.831C9.30907 8.68633 9.41641 8.50667 9.48641 8.292C9.55641 8.07267 9.59141 7.81833 9.59141 7.529C9.59141 6.95033 9.44907 6.51867 9.16441 6.234C8.87974 5.94933 8.45274 5.807 7.88341 5.807H7.00141V9.258ZM11.8994 10.056C11.7548 10.056 11.6404 10.0163 11.5564 9.937C11.4771 9.853 11.4374 9.734 11.4374 9.58V5.541C11.4374 5.387 11.4771 5.27033 11.5564 5.191C11.6404 5.107 11.7594 5.065 11.9134 5.065H14.3564C14.4778 5.065 14.5688 5.09533 14.6294 5.156C14.6901 5.21667 14.7204 5.303 14.7204 5.415C14.7204 5.53167 14.6901 5.62267 14.6294 5.688C14.5688 5.74867 14.4778 5.779 14.3564 5.779H12.3334V7.172H14.2094C14.3261 7.172 14.4148 7.20233 14.4754 7.263C14.5408 7.32367 14.5734 7.41 14.5734 7.522C14.5734 7.63867 14.5408 7.72967 14.4754 7.795C14.4148 7.85567 14.3261 7.886 14.2094 7.886H12.3334V9.58C12.3334 9.89733 12.1888 10.056 11.8994 10.056Z'
                          fill='white'
                        />
                      </svg>
                      <p>
                        {p.name}
                      </p>
                      <button onClick={() => { openPdf(p.filename)}}>
                        <svg
                          width='3'
                          height='14'
                          viewBox='0 0 3 14'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M1.5 0.25C0.675 0.25 0 0.925 0 1.75C0 2.575 0.675 3.25 1.5 3.25C2.325 3.25 3 2.575 3 1.75C3 0.925 2.325 0.25 1.5 0.25ZM1.5 10.75C0.675 10.75 0 11.425 0 12.25C0 13.075 0.675 13.75 1.5 13.75C2.325 13.75 3 13.075 3 12.25C3 11.425 2.325 10.75 1.5 10.75ZM1.5 5.5C0.675 5.5 0 6.175 0 7C0 7.825 0.675 8.5 1.5 8.5C2.325 8.5 3 7.825 3 7C3 6.175 2.325 5.5 1.5 5.5Z'
                            fill='#212121'
                          />
                        </svg>
                      </button>
                    </Bottom>
                  </StyledCard>
                </div>
              )
            })
          : null}
      </Carousel>
    </Container>
  )
}

export default TeachInteractCarousel
