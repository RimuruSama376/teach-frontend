import styled from 'styled-components'
import TeachCarousel from '../../Molecules/Teachcarousel'
import TeachInteract from '../../Molecules/TeachInteract'
import { IChapter } from '../../../screens/Teach'

const Container = styled.div`
  font-family: 'Nunito', sans-serif;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 10px;
  overflow: scroll;
`

interface TeachProps {
  activeChapter: IChapter | undefined
  handleAddContent: (s: string) => void
}

const TeachSection: React.FC<TeachProps> = ({ activeChapter, handleAddContent }) => {
  return (
    <Container className='teachsection'>
      <TeachCarousel activeChapter={activeChapter} handleAddContent={handleAddContent} />
      <TeachInteract activeChapter={activeChapter} />
    </Container>
  )
}

export default TeachSection
