import styled from 'styled-components'
import TeachCarousel from '../../Molecules/Teachcarousel'
import TeachInteract from '../../Molecules/TeachInteract'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  height: 100% !important;
`

function TeachSection() {
  const urls = [
    'https://www.youtube.com/watch?v=cLRztK1zE6s',
    'https://www.youtube.com/watch?v=LSRNmhLS76o',
    'https://www.youtube.com/watch?v=3WCIyNOrzwM&t=588s',
    'https://www.youtube.com/watch?v=e0CaefOcyAY'
  ]
  return (
    <Container>
      <TeachCarousel title='' urls={urls} />
      <TeachInteract />
    </Container>
  )
}

export default TeachSection
