import styled from 'styled-components'
import TopicInfo from '../TopicInfo'
import Whiteboard from '../Whiteboard'
import { IChapter } from '../../../screens/Teach'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 2;
  margin-top: 20px;
  /* flex-grow: 1; */
`

interface TeachProps {
  activeChapter: IChapter | undefined
}

const TeachInteract: React.FC<TeachProps> = ({ activeChapter }) => {
  return (
    <Container>
      <TopicInfo activeChapter={activeChapter}></TopicInfo>
      <Whiteboard></Whiteboard>
    </Container>
  )
}

export default TeachInteract
