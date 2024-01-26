import styled from 'styled-components'
import TeachCarousel from '../../Molecules/Teachcarousel'
import TeachInteract from '../../Molecules/TeachInteract'
import { IChapter } from '../../../screens/Teach'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  height: 100% !important;
`

interface TeachProps {
  activeChapter: IChapter | undefined
  handleAddContent: (s: string) => void
}

const TeachSection: React.FC<TeachProps> = ({ activeChapter, handleAddContent }) => {
  return (
    <Container>
      <TeachCarousel activeChapter={activeChapter} handleAddContent={handleAddContent}/>
      <TeachInteract activeChapter={activeChapter}/>
    </Container>
  )
}

export default TeachSection
