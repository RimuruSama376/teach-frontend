import styled from 'styled-components'
import TeachCarousel from '../../Molecules/Teachcarousel'

const Container = styled.div`
  padding-top: 10px;
  height: 100% !important;
`

function TeachSection() {
  return (
    <Container>
      <TeachCarousel title='' urls={[]}/>
    </Container>
  )
}

export default TeachSection
