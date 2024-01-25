import styled from 'styled-components'
import TeachCarousel from '../../Molecules/Teachcarousel/indext'

const Container = styled.div`
  padding-top: 10px;
  height: 100% !important;
`

function TeachSection() {
  return (
    <Container>
      TeachSection
      <TeachCarousel />
    </Container>
  )
}

export default TeachSection
