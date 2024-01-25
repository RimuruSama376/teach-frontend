import styled from 'styled-components'
import TopicInfo from '../TopicInfo'
import Whiteboard from '../Whiteboard'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 2;
  margin-top: 20px;
  /* flex-grow: 1; */
`

function TeachInteract() {
  return (
    <Container>
      <TopicInfo></TopicInfo>
      <Whiteboard></Whiteboard>
    </Container>
  )
}

export default TeachInteract
