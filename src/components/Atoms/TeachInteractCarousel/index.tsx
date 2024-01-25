import styled from 'styled-components'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const Container = styled.div`
  max-width: 500px;
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
`

const contentStyle: React.CSSProperties = {
  margin: 2,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}

interface TeachCarouselProps {
  title: string
  urls: string[]
}

const TeachInteractCarousel: React.FC<TeachCarouselProps> = ({ title, urls }) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }
  console.log(urls.length)
  return (
    <Container>
      <Carousel
        afterChange={onChange}
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        slidesToShow={3}
        dots={false}
      >
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </Container>
  )
}

export default TeachInteractCarousel
